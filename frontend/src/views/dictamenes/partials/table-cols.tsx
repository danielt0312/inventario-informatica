import type { ColumnDef } from "@tanstack/react-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { dictamenVersionHasArchivo, isDetailedActionFormDictamen, isDetailedEditableFormActionDictamen, isDetailedPorSurtirDictamen, isDetailedSurtidoParcialDictamen, isSurtidoDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import { CircleXIcon, FileInputIcon, PackageOpenIcon, PackagePlusIcon, PaperclipIcon, SquarePenIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route as ActionRoute } from "@/routes/_auth/dictamenes/$uuid/$action";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/editar";
import { ActionDictamenEstadoEnum, ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { useState, type JSX } from "react";
import { useSurtirMutation } from "../form-actions/surtir/form";
import { ArchivoPreviewActionRow } from "@/components/features/archivos/table-cols";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import { DictamenEstadoEnum } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import type { DetailedEditableFormActionDictamen, DetailedFormActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DetailedDictamen, DetailedPorSurtirDictamen, DetailedSurtidoParcialDictamen, DictamenEstado } from "@/types/dictamenes";
import { ActionRow } from "@/components/ui/action-row";
import { RouterButton } from "@/components/ui/router-button";

const FormActionIcon = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: <FileInputIcon />,
    [ActionDictamenEstadoEnum.EVIDENCIAR]: <PaperclipIcon />,
    [ActionDictamenEstadoEnum.INVENTARIAR]: <PackageOpenIcon />,
} as const satisfies Record<ActionDictamenEstadoEnum, JSX.Element>;

const FormActionItemRow = ({ dictamen }: ActionProps<DetailedFormActionDictamen>) => (
    <RouterButton
        tooltip={{
            message: <span className="capitalize">{ActionDictamenStates[dictamen.estado.id]}</span>
        }}
        to={ActionRoute.to}
        params={{
            uuid: dictamen.uuid,
            action: ActionDictamenStates[dictamen.estado.id]
        }}
        variant="outline"
        size="icon"
    >
        {FormActionIcon[dictamen.estado.id]}
    </RouterButton>
);

const EdicionActionItemRow = ({ dictamen }: ActionProps<DetailedEditableFormActionDictamen>) => (
    <RouterButton
        to={EditarRoute.to}
        params={{ uuid: dictamen.uuid }}
        tooltip={{ message: "Editar" }}
        variant="outline"
        size="icon"
    >
        <SquarePenIcon />
    </RouterButton>
);

const SurtirActionRow = ({ dictamen }: ActionProps<DetailedPorSurtirDictamen | DetailedSurtidoParcialDictamen>) => {
    const [open, setOpen] = useState(false);
    const mutation = useSurtirMutation(dictamen);
    const navigate = useNavigate();
    const nextState = ActionDictamenEstadoEnum.INVENTARIAR;

    return (
        <>
            <ActionRow
                onClick={() => setOpen(true)}
                tooltip={{ message: "Surtir" }}
            >
                <PackagePlusIcon />
            </ActionRow>

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

interface ActionProps<TDictamen extends DetailedDictamen> {
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
                [DictamenEstadoEnum.POR_SURTIR]: "bg-yellow-300/50",
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

export const columns: ColumnDef<DetailedDictamen>[] = [
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
        cell: ({ row }) => {
            const dictamen = row.original;

            return (
                <div className="flex flex-col gap-2">
                    <EstadoBadge estado={row.original.estado} />
                    {(isSurtidoDictamen(dictamen) && dictamen.tiene_observaciones) && (
                        <Badge variant="outline">Tiene observaciones</Badge>
                    )}
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const dictamen = row.original;

            return (
                <div className="flex gap-1">
                    {isDetailedEditableFormActionDictamen(dictamen) && (
                        <EdicionActionItemRow dictamen={dictamen} />
                    )}
                    {isDetailedActionFormDictamen(dictamen) && (
                        <FormActionItemRow dictamen={dictamen} />
                    )}
                    {(isDetailedPorSurtirDictamen(dictamen) || isDetailedSurtidoParcialDictamen(dictamen)) && <SurtirActionRow dictamen={dictamen} />}
                    {dictamenVersionHasArchivo(dictamen.version_actual) && (
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
