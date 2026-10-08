import type { ColumnDef } from "@tanstack/react-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { dictamenVersionHasArchivo, esDetailedCorregibleFormActionDictamen, esSurtidoDictamen, esSurtidoParcialDictamen, esSurtibleDictamen, esFormActionDictamen, esCancelableDictamen } from "@/components/features/dictamenes/guards";
import { BadgeCheckIcon, BanIcon, CircleArrowRight, CircleDashedCheckIcon, CircleXIcon, FilePenIcon, PackageOpenIcon, PackagePlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route as ActionRoute } from "@/routes/_auth/dictamenes/$uuid/$action";
import { Route as CorregirRoute } from "@/routes/_auth/dictamenes/$uuid/corregir";
import React, { useState, type JSX } from "react";
import { useSurtirMutation } from "./surtir/form";
import { ArchivoPreviewActionRow } from "@/components/features/archivos/table-cols";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import { DictamenEstadoEnum } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import type { DetailedDictamen, DetailedPorSurtirDictamen, DetailedSurtidoParcialDictamen, Dictamen, DictamenEstado } from "@/types/dictamenes";
import { ActionRow } from "@/components/ui/action-row";
import { RouterButton } from "@/components/ui/router-button";
import { ActionDictamenEstadoEnum, ActionDictamenStates } from "./form-action/constants";
import type { DetailedCorregibleFormActionDictamen, DetailedFormActionDictamen } from "./form-action/types";
import { EmptyValue } from "@/components/ui/empty-value";
import { useMutation } from "@tanstack/react-query";
import { cancelarDictamenMutationOptions } from "./cancelar/mutation";

const FormActionIcon = {
    [ActionDictamenEstadoEnum.PorDictaminar]: <CircleDashedCheckIcon />,
    [ActionDictamenEstadoEnum.PendienteAcuse]: <BadgeCheckIcon />,
    [ActionDictamenEstadoEnum.PorInventariar]: <PackageOpenIcon />,
} as const satisfies Record<ActionDictamenEstadoEnum, JSX.Element>;

const FormActionLabel = {
    [ActionDictamenEstadoEnum.PorDictaminar]: 'Dictaminar Adquisiciones',
    [ActionDictamenEstadoEnum.PendienteAcuse]: 'Evidenciar Acuse de Recibido',
    [ActionDictamenEstadoEnum.PorInventariar]: 'Inventariar Bienes Informáticos',
} as const satisfies Record<ActionDictamenEstadoEnum, string>;

const FormActionItemRow = ({ dictamen }: ActionProps<DetailedFormActionDictamen>) => {
    const estadoId = dictamen.estado.id;

    return (
        <RouterButton
            tooltip={{
                message: FormActionLabel[estadoId]
            }}
            to={ActionRoute.to}
            params={{
                uuid: dictamen.uuid,
                action: ActionDictamenStates[estadoId]
            }}
            variant="outline"
            size="icon"
        >
            {FormActionIcon[estadoId]}
        </RouterButton>
    );
}

const CorregirActionItemRow = ({ dictamen }: ActionProps<DetailedCorregibleFormActionDictamen>) => (
    <RouterButton
        to={CorregirRoute.to}
        params={{ uuid: dictamen.uuid }}
        tooltip={{ message: "Corregir Adquisiciones" }}
        variant="outline"
        size="icon"
    >
        <FilePenIcon />
    </RouterButton>
);

const CancelarActionItemRow = ({ dictamen }: { dictamen: Dictamen }) => {
    const { mutate, isPending } = useMutation({
        ...cancelarDictamenMutationOptions(dictamen),
        onSuccess: async (_, __, ___, { client }) => {
            await client.invalidateQueries({ queryKey: ['dictamenes'] })
            setOpenDialog(false);
        }
    });

    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <>
            <ActionRow
                variant="destructive"
                tooltip={{
                    message: "Cancelar Dictamen"
                }}
                onClick={() => setOpenDialog(true)}
            >
                <BanIcon />
            </ActionRow>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ¿Deseas continuar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Al continuar, estarás cancelando el dictamen de tecnologías. Esta acción no se puede revertir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => mutate()} disabled={isPending} variant="destructive">
                            Continuar <CircleArrowRight />
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                            <CircleXIcon /> Cancelar
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

const SurtirActionRow = ({ dictamen }: ActionProps<DetailedPorSurtirDictamen | DetailedSurtidoParcialDictamen>) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, status } = useSurtirMutation(dictamen);
    const navigate = useNavigate();
    const nextState = ActionDictamenEstadoEnum.PorInventariar;

    return (
        <>
            <ActionRow
                onClick={() => setOpen(true)}
                tooltip={{ message: "Surtir Bienes Informáticos" }}
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
                                await mutateAsync();
                                await navigate({
                                    to: ActionRoute.to,
                                    params: {
                                        uuid: dictamen.uuid,
                                        action: ActionDictamenStates[nextState]
                                    }
                                });
                            }}
                            disabled={status === 'pending'}
                        >
                            {FormActionIcon[nextState]} Confirmar e Inventariar
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={() => setOpen(false)} autoFocus>
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
    undefined,
    {
        variants: {
            variant: {
                default: undefined,
                [DictamenEstadoEnum.PorDictaminar]: "bg-yellow-200",
                [DictamenEstadoEnum.PendienteAcuse]: "bg-yellow-300/70",
                [DictamenEstadoEnum.PorSurtir]: "bg-yellow-300",
                [DictamenEstadoEnum.PorInventariar]: "bg-yellow-400",
                [DictamenEstadoEnum.Surtido]: "bg-lime-400",
                [DictamenEstadoEnum.SurtidoParcial]: "bg-lime-400/60",
                [DictamenEstadoEnum.Cancelado]: "bg-red-400/90",
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

const defaultColumns: ColumnDef<DetailedDictamen>[] = [
    {
        header: "No.",
        cell: ({ row }) => row.original.id
    },
    {
        header: "Fecha de Solicitud",
        cell: ({ row }) => toLocaleDateFormat(row.original.version_actual.fecha_solicitud)
    },
    {
        header: "Área Solicitante",
        accessorKey: "",
    },
    {
        header: "Folio de Solicitud",
        cell: ({ row }) => (
            row.original.oficio?.folio ?? <EmptyValue />
        )
    },
    {
        header: "Estado",
        cell: ({ row }) => {
            const dictamen = row.original;

            return (
                <div className="flex flex-col gap-2">
                    <EstadoBadge estado={row.original.estado} />
                    {((esSurtidoDictamen(dictamen) || esSurtidoParcialDictamen(dictamen)) && dictamen.tiene_observaciones) && (
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
                    {esDetailedCorregibleFormActionDictamen(dictamen) && (
                        <CorregirActionItemRow dictamen={dictamen} />
                    )}
                    {esFormActionDictamen(dictamen) && (
                        <FormActionItemRow dictamen={dictamen} />
                    )}
                    {esSurtibleDictamen(dictamen) && (
                        <SurtirActionRow dictamen={dictamen} />
                    )}
                    {dictamenVersionHasArchivo(dictamen.version_actual) && (
                        <ArchivoPreviewActionRow
                            archivo={dictamen.version_actual.archivo}
                            meta={table.options.meta}
                        />
                    )}
                    {/* {esCancelableDictamen(dictamen) && (
                        <CancelarActionItemRow dictamen={dictamen} />
                    )} */}
                </div>
            );
        }
    },
];

export {
    estadoColorVariants as dictamenEstadoColorVariants,
    EstadoBadge as DictamenEstadoBadge,
    FormActionLabel as DictamenFormActionLabel,
    defaultColumns as dictamenDefaultTableColumns
}
