import type { Resguardo, ResguardoEstado } from "@/types/resguardos";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ResguardoEstadoEnum } from "@/lib/constants";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArchivoPreviewActionRow } from "../../archivos/table-cols";
import { useMutation } from "@tanstack/react-query";
import { esResguardoEstadoCancelado } from "../utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CircleArrowRightIcon, CircleXIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { ActionRow } from "@/components/ui/action-row";
import React from "react";
import api from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
import { RouterButton } from "@/components/ui/router-button";
import { Route as InspeccionarRoute } from "@/routes/_auth/resguardos/$uuid/inspeccionar";

const estadoColorVariants = cva(
    "text-black",
    {
        variants: {
            variant: {
                default: undefined,
                [ResguardoEstadoEnum.ACTIVO]: "bg-lime-400",
                [ResguardoEstadoEnum.PENDIENTE_ACUSE]: "bg-yellow-400/50",
                [ResguardoEstadoEnum.CANCELADO]: "bg-red-400/90",
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
    estado: ResguardoEstado
}) => (
    <Badge
        {...props}
        className={cn(
            estadoColorVariants({ variant: estado.id }),
            className
        )}
    >
        {estado.nombre}
    </Badge>
);

const DestroyAction = ({
    resguardo
}: {
    resguardo: Resguardo
}) => {
    const { mutate, isPending } = useMutation({
        mutationFn: () => api.delete(`api/resguardos/${resguardo.uuid}`),
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({
                queryKey: ['resguardos']
            });
        }
    });
    const [alertOpen, setAlertOpen] = React.useState(false);

    return (
        <>
            <ActionRow
                onClick={() => setAlertOpen(true)}
                variant="destructive"
                tooltip={{
                    message: "Cancelar",
                }}
            >
                <Trash2Icon />
            </ActionRow>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ¿Deseas continuar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Al continuar, estarás cancelando este resguardo y los artículos no tendrán ningún resguardante.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction variant="destructive" onClick={() => mutate()} disabled={isPending}>
                            {isPending ? (
                                <><Spinner /> Cancelando...</>
                            ) : (
                                <><CircleArrowRightIcon /> Continuar</>
                            )}
                        </AlertDialogAction>
                        <AlertDialogCancel>
                            <CircleXIcon /> Cancelar
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

const columns: ColumnDef<Resguardo>[] = [
    {
        header: 'Área de Adscripción',
        accessorFn: (row) => row.adscripcion.nombre,
    },
    {
        header: 'Resguardante',
        accessorFn: (row) => row.empleado.nombre,
    },
    {
        header: 'Última actualización',
        accessorFn: (row) => toLocaleDateFormat(row.fecha_actualizacion)
    },
    {
        header: 'Estado',
        cell: ({ row }) => <EstadoBadge estado={row.original.estado} />
    },
    {

        id: 'actions',
        cell: ({ row, table }) => {
            const resguardo = row.original;

            return (
                <div className="flex gap-1">
                    <ArchivoPreviewActionRow meta={table.options.meta} archivo={resguardo.archivo} />
                    <RouterButton
                        to={InspeccionarRoute.to}
                        params={{ uuid: resguardo.uuid }}
                        size="icon"
                        variant="outline"
                        tooltip={{
                            message: "Inspeccionar"
                        }}
                    >
                        <SearchIcon />
                    </RouterButton>
                    {!esResguardoEstadoCancelado(resguardo.estado.id) && <DestroyAction resguardo={resguardo} />}
                </div>
            );
        },
    }
];

export {
    columns as resguardoTableColumns,
    EstadoBadge as ResguardoEstadoBadge
}
