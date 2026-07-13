import type { ColumnDef } from "@tanstack/react-table";
import { CircleXIcon, EyeIcon, FileInputIcon, PackageCheckIcon, PackageOpenIcon, PackagePlusIcon, PaperclipIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
    isActionDictamen,
    Route as ActionRoute,
    isActionDictaminadoDictamen,
    isSurtirDictamen,
} from "@/routes/_auth/dictamenes/$uuid/$action";
import * as Root from "@/components/composed/action-menu";
import { Spinner } from "@/components/ui/spinner";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import type { DictaminadoDictamen, SurtirDictamen } from "@/types/dictamenes";
import type { ActionDictamen, ActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { ActionDictamenEstadoEnum, ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { useState, type JSX } from "react";
import { useSurtirMutation } from "../actions/surtir/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ActionIcon = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: <FileInputIcon />,
    [ActionDictamenEstadoEnum.EVIDENCIAR]: <PaperclipIcon />,
    [ActionDictamenEstadoEnum.INVENTARIAR]: <PackageOpenIcon />,
    [ActionDictamenEstadoEnum.RESGUARDAR]: <PackageCheckIcon />
} as const satisfies Record<ActionDictamenEstadoEnum, JSX.Element>;

const ActionMenuItem = ({ state, ...props }: React.ComponentProps<typeof Root.ActionMenuItem> & { state: ActionDictamenEstadoEnum }) => (
    <Root.ActionMenuItem className="capitalize" {...props}>
        {ActionIcon[state]} {ActionDictamenStates[state]}
    </Root.ActionMenuItem>
);

const ViewFileActionMenuItem = ({ dictamen }: { dictamen: ActionDictaminadoDictamen | DictaminadoDictamen }) => {
    const { uuid, nombre } = dictamen.documento;
    const { mutate, isPending } = useFilePreviewWindowMutation();

    return (
        <Root.ActionMenuItem
            disabled={isPending}
            onClick={() => mutate({ uuid, title: nombre || uuid })}
        >
            {isPending ? <Spinner /> : <EyeIcon />} Ver documento
        </Root.ActionMenuItem>
    );
}

const FormActionMenu = ({ dictamen }: { dictamen: ActionDictamen }) => (
    <Root.ActionMenu>
        <Link
            to={ActionRoute.to}
            params={{
                uuid: dictamen.uuid,
                action: ActionDictamenStates[dictamen.estado.id]
            }}
        >
            <ActionMenuItem state={dictamen.estado.id} />
        </Link>
        {isActionDictaminadoDictamen(dictamen) && (
            <>
                <Root.ActionMenuSeparator />
                <ViewFileActionMenuItem dictamen={dictamen} />
            </>
        )}
    </Root.ActionMenu>
);

const SurtirActionMenu = ({ dictamen }: { dictamen: SurtirDictamen }) => {
    const [open, setOpen] = useState(false);
    const mutation = useSurtirMutation(dictamen);
    const navigate = useNavigate();
    const nextState = ActionDictamenEstadoEnum.INVENTARIAR;

    return (
        <>
            <Root.ActionMenu>
                <Root.ActionMenuItem onClick={() => setOpen(true)}>
                    <PackagePlusIcon /> Surtir
                </Root.ActionMenuItem>
                <Root.ActionMenuSeparator />
                <ViewFileActionMenuItem dictamen={dictamen} />
            </Root.ActionMenu>

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
                            {ActionIcon[nextState]} Confirmar e Inventariar
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

export type DictamenData = ActionDictamen | DictaminadoDictamen;

const ActionMenu = ({ dictamen }: { dictamen: DictamenData }) => {
    if (isSurtirDictamen(dictamen)) {
        return <SurtirActionMenu dictamen={dictamen} />;
    }

    if (isActionDictamen(dictamen)) {
        return <FormActionMenu dictamen={dictamen} />
    }

    return (
        <Root.ActionMenu>
            <ViewFileActionMenuItem dictamen={dictamen} />
        </Root.ActionMenu>
    );
}

export const columns: ColumnDef<DictamenData>[] = [
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
