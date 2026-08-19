import type { ColumnDef } from "@tanstack/react-table";
import type { DetailedActionDictamen, DetailedEditableActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DetailedDictaminadoDictamen, DetailedSurtirDictamen, DictamenEstado } from "@/types/dictamenes";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { isDetailedActionDictamen,isDetailedDictaminadoDictamen, isDetailedEditableActionDictamen, isDetailedSurtirDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import { CircleXIcon, FileInputIcon, PackageOpenIcon, PackagePlusIcon, PaperclipIcon, SquarePenIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Route as ActionRoute } from "@/routes/_auth/dictamenes/$uuid/$action";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/editar";
import { ActionDictamenEstadoEnum, ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { useState, type JSX } from "react";
import { useSurtirMutation } from "../actions/surtir/form";
import { ArchivoPreviewActionRow } from "@/components/features/archivos/table-cols";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import { DictamenEstadoEnum } from "@/lib/constants";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";

const FormActionIcon = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: <FileInputIcon />,
    [ActionDictamenEstadoEnum.EVIDENCIAR]: <PaperclipIcon />,
    [ActionDictamenEstadoEnum.INVENTARIAR]: <PackageOpenIcon />,
} as const satisfies Record<ActionDictamenEstadoEnum, JSX.Element>;

const ActionButton = (props?: React.ComponentProps<typeof TooltipButton>) => (
    <TooltipButton
        variant="outline"
        size="icon"
        {...props}
    />
)

const FormActionItemRow = ({ state }: { state: ActionDictamenEstadoEnum }) => (
    <ActionButton
        tooltip={{
            message: <span className="capitalize">{ActionDictamenStates[state]}</span>
        }}
    >
        {FormActionIcon[state]}
    </ActionButton>
);

const EdicionActionItemRow = ({ dictamen }: { dictamen: DetailedEditableActionDictamen }) => (
    <Link to={EditarRoute.to} params={{ uuid: dictamen.uuid }}>
        <ActionButton
            tooltip={{
                message: "Editar"
            }}
        >
            <SquarePenIcon />
        </ActionButton>
    </Link>
);

const FormActionRow = ({ dictamen }: ActionProps<DetailedActionDictamen>) => (
    <Link
        to={ActionRoute.to}
        params={{
            uuid: dictamen.uuid,
            action: ActionDictamenStates[dictamen.estado.id]
        }}
    >
        <FormActionItemRow state={dictamen.estado.id} />
    </Link>
);

const SurtirActionRow = ({ dictamen }: ActionProps<DetailedSurtirDictamen>) => {
    const [open, setOpen] = useState(false);
    const mutation = useSurtirMutation(dictamen);
    const navigate = useNavigate();
    const nextState = ActionDictamenEstadoEnum.INVENTARIAR;

    return (
        <>
            <ActionButton
                onClick={() => setOpen(true)}
                tooltip={{ message: "Surtir" }}
            >
                <PackagePlusIcon />
            </ActionButton>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ¿Confirmar surtimiento?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Al continuar, estarás confirmando que los bienes informáticos ya se encuentran dentro de la institución y procederás a realizar el inventariado.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={async () => {
                                await mutation.mutateAsync();
                                await navigate({
                                    to: ActionRoute.to,
                                    params: {
                                        uuid: dictamen.uuid,
                                        action: ActionDictamenStates[nextState]
                                    }
                                });
                            }}
                        >
                            {FormActionIcon[nextState]} Confirmar e Inventariar
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            <CircleXIcon /> Cancelar
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export type DictamenData = DetailedActionDictamen | DetailedDictaminadoDictamen;

interface ActionProps<TDictamen extends DictamenData> {
    dictamen: TDictamen;
}

const estadoColorVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: undefined,
                [DictamenEstadoEnum.DICTAMINAR]: "bg-red-400/90",
                [DictamenEstadoEnum.EVIDENCIAR]: "bg-orange-300",
                [DictamenEstadoEnum.SURTIR]: "bg-yellow-300/50",
                [DictamenEstadoEnum.INVENTARIAR]: "bg-yellow-400/70",
                [DictamenEstadoEnum.SURTIDO]: "bg-lime-400",
                [DictamenEstadoEnum.SURTIDO_PARCIAL]: "bg-lime-400/60",
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

const EstadoBadge = ({
    estado,
    className,
    ...props
}: React.ComponentProps<typeof Badge> & {
    estado: DictamenEstado
}) => (
    <Badge
        {...props}
        className={cn(
            estadoColorVariants({ variant: estado.id }),
            "text-foreground",
            className
        )}
    >
        {estado.nombre}
    </Badge>
)

export const columns: ColumnDef<DictamenData>[] = [
    {
        accessorKey: "version_actual.fecha_solicitud",
        header: "Fecha de Solicitud",
        cell: ({ getValue }) => toLocaleDateFormat(getValue<string>())
    },
    {
        accessorKey: "",
        header: "Área Solicitante",
    },
    {
        accessorKey: "version_actual.oficio.folio",
        header: "Folio de Solicitud",
    },
    {
        header: "Estado",
        cell: ({ row }) => (
            <EstadoBadge estado={row.original.estado} />
        )
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const dictamen = row.original;

            return (
                <div className="flex gap-1">
                    {isDetailedEditableActionDictamen(dictamen) && (
                        <EdicionActionItemRow dictamen={dictamen} />
                    )}
                    {isDetailedActionDictamen(dictamen) && (
                        <FormActionRow dictamen={dictamen} />
                    )}
                    {isDetailedSurtirDictamen(dictamen) && <SurtirActionRow dictamen={dictamen} />}
                    {isDetailedDictaminadoDictamen(dictamen) && (
                        <ArchivoPreviewActionRow
                            archivo={dictamen.version_actual.archivo}
                            meta={table.options.meta}
                        />
                    )}
                </div>
            );
        }
    },
];

export {
    estadoColorVariants as dictamenEstadoColorVariants,
    EstadoBadge as DictamenEstadoBadge,
}
