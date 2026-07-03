import type { ColumnDef } from "@tanstack/react-table";
import { DictamenEstadoEnum } from "@/lib/constants";
import { EyeIcon, FileInputIcon, PackageOpenIcon, PackagePlus, PackagePlusIcon, PaperclipIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
    isActionDictamen,
    Route as ActionRoute,
    isDictaminadoDictamen,
} from "@/routes/_auth/dictamenes/$uuid/$action";
import * as Root from "@/components/composed/action-menu";
import { Spinner } from "@/components/ui/spinner";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import type { Dictamen } from "@/types/dictamenes";
import { ActionStates, type ActionDictamen, type ActionDictamenEstadoEnum, type DictaminadoActionDictamen, type DictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useSurtirMutation } from "../actions/surtir/form";

const ActionIcon = {
    [DictamenEstadoEnum.DICTAMINAR]: <FileInputIcon />,
    [DictamenEstadoEnum.EVIDENCIAR]: <PaperclipIcon />,
    [DictamenEstadoEnum.SURTIR]: <PackagePlusIcon />,
    [DictamenEstadoEnum.INVENTARIAR]: <PackageOpenIcon />,
    [DictamenEstadoEnum.RESGUARDAR]: <PackagePlus />
} as const;

const ViewFileActionMenu = ({ dictamen }: { dictamen: DictaminadoDictamen }) => {
    const { uuid, nombre } = dictamen.documento;
    const { mutate, isPending } = useFilePreviewWindowMutation();

    return (
        <Root.ActionMenuItem
            disabled={isPending}
            onClick={() => mutate({ uuid, title: nombre || uuid })}
        >
            {isPending
                ? <Spinner />
                : <EyeIcon />
            } Ver documento
        </Root.ActionMenuItem>
    );
}

const ActionMenuItem = ({ state, children, ...props }: React.ComponentProps<typeof Root.ActionMenuItem> & { state: ActionDictamenEstadoEnum }) => (
    <Root.ActionMenuItem className="capitalize" {...props}>
        {ActionIcon[state]} {ActionStates[state]}
        {children}
    </Root.ActionMenuItem>
);

const NavigationActionMenu = ({ dictamen }: { dictamen: ActionDictamen }) => (
    <Root.ActionMenu>
        <Link
            to={ActionRoute.to}
            params={{
                uuid: dictamen.uuid,
                action: ActionStates[dictamen.estado.id]
            }}
        >
            <ActionMenuItem state={dictamen.estado.id} />
            {isDictaminadoDictamen(dictamen) && (
                <>
                    <Root.ActionMenuSeparator />
                    <ViewFileActionMenu dictamen={dictamen} />
                </>
            )}
        </Link>
    </Root.ActionMenu>
);

const SurtirActionMenu = ({ dictamen }: { dictamen: DictaminadoActionDictamen }) => {
    const [open, setOpen] = useState(false);
    const mutation = useSurtirMutation(dictamen);
    const navigate = useNavigate();

    return (
        <>
            <Root.ActionMenu>
                <ActionMenuItem
                    state={dictamen.estado.id}
                    onClick={() => setOpen(true)}
                />
                <Root.ActionMenuSeparator />
                <ViewFileActionMenu dictamen={dictamen} />
            </Root.ActionMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            ¿Desas continuar?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Al continuar, estarás confirmando que los bienes informáticos ya se encuentran en la institución.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogAction
                        onClick={async () => {
                            await mutation.mutateAsync();
                            navigate({
                                to: ActionRoute.to,
                                params: {
                                    uuid: dictamen.uuid,
                                    action: ActionStates[dictamen.estado.id]
                                }
                            });
                        }}
                    >
                        Continuar
                    </AlertDialogAction>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

const ActionMenu = ({ dictamen }: { dictamen: Dictamen }) => {
    const actionState = isActionDictamen(dictamen);
    const dictaminadoState = isDictaminadoDictamen(dictamen);

    return (
        actionState && ActionStates[dictamen.estado.id] === 'surtir'
            ? <SurtirActionMenu dictamen={dictamen} />
            : actionState && dictaminadoState
                ? <NavigationActionMenu dictamen={dictamen} />
                : (
                    <Root.ActionMenu>
                        <ViewFileActionMenu dictamen={dictamen} />
                    </Root.ActionMenu>
                )
    )
}

export const columns: ColumnDef<Dictamen>[] = [
    {
        accessorKey: "fecha_solicitud",
        header: "Fecha de Solicitud",
        cell: ({ getValue }) => {
            const date = getValue<Date>();

            return new Date(date).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'UTC'
            });
        }
    },
    {
        accessorKey: "",
        header: "Área Solicitante",
    },
    {
        accessorKey: "oficio.folio",
        header: "Folio de Solicitud",
    },
    {
        accessorKey: "estado.nombre",
        header: "Estado",
    },
    {
        id: "actions",
        cell: ({ row: { original: data } }) => (
            <ActionMenu dictamen={data} />
        )
    },
];
