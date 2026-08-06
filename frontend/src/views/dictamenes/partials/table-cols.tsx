import type { ColumnDef, TableMeta } from "@tanstack/react-table";
import { CircleXIcon, FileInputIcon, PackageOpenIcon, PackagePlusIcon, PaperclipIcon, SquarePenIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Route as ActionRoute } from "@/routes/_auth/dictamenes/$uuid/$action";
import * as Root from "@/components/ui/action-menu";
import { ActionDictamenEstadoEnum, ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { useState, type JSX } from "react";
import { useSurtirMutation } from "../actions/surtir/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { DetailedActionDictamen, DetailedActionDictaminadoDictamen, DetailedEditableActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DetailedDictaminadoDictamen, DetailedSurtirDictamen } from "@/types/dictamenes";
import { isActionDictamen, isActionDictaminadoDictamen, isDetailedSurtirDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import { ArchivoPreviewActionRow } from "@/views/common/archivos/partials/table-cols";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/editar";
import { toLocaleDateFormat } from "@/lib/utils";

const ActionIcon = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: <FileInputIcon />,
    [ActionDictamenEstadoEnum.EVIDENCIAR]: <PaperclipIcon />,
    [ActionDictamenEstadoEnum.INVENTARIAR]: <PackageOpenIcon />,
} as const satisfies Record<ActionDictamenEstadoEnum, JSX.Element>;

const ActionMenuItem = ({ state, ...props }: React.ComponentProps<typeof Root.ActionMenuItem> & { state: ActionDictamenEstadoEnum }) => (
    <Root.ActionMenuItem className="capitalize" {...props}>
        {ActionIcon[state]} {ActionDictamenStates[state]}
    </Root.ActionMenuItem>
);

const ViewFileActionMenuItem = ({ dictamen, meta }: ActionProps<DetailedActionDictaminadoDictamen | DetailedDictaminadoDictamen>) => (
    <ArchivoPreviewActionRow archivo={dictamen.version_actual.archivo} meta={meta} />
)

const EditableActionMenuItem = ({ dictamen }: { dictamen: DetailedEditableActionDictamen }) => (
    <Link to={EditarRoute.to} params={{ uuid: dictamen.uuid }}>
        <Root.ActionMenuItem><SquarePenIcon /> Editar</Root.ActionMenuItem>
    </Link>
);

const FormActionMenu = ({ dictamen, meta }: ActionProps<DetailedActionDictamen>) => (
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
                <ViewFileActionMenuItem dictamen={dictamen} meta={meta} />
            </>
        )}
    </Root.ActionMenu>
);

const SurtirActionMenu = ({ dictamen, meta }: ActionProps<DetailedSurtirDictamen>) => {
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
                <EditableActionMenuItem dictamen={dictamen} />

                <Root.ActionMenuSeparator />

                <ViewFileActionMenuItem dictamen={dictamen} meta={meta} />
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

export type DictamenData = DetailedActionDictamen | DetailedDictaminadoDictamen;

interface ActionProps<TDictamen extends DictamenData> {
    dictamen: TDictamen;
    meta?: TableMeta<TDictamen>;
}

const ActionMenu = ({ dictamen, meta }: ActionProps<DictamenData>) => {
    if (isDetailedSurtirDictamen(dictamen)) {
        return <SurtirActionMenu dictamen={dictamen} meta={meta} />;
    }

    if (isActionDictamen(dictamen)) {
        return <FormActionMenu dictamen={dictamen} meta={meta} />
    }

    return (
        <Root.ActionMenu>
            <ViewFileActionMenuItem dictamen={dictamen} meta={meta} />
        </Root.ActionMenu>
    );
}

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
        accessorKey: "estado.nombre",
        header: "Estado",
    },
    {
        id: "actions",
        cell: ({ row, table }) => (
            <ActionMenu dictamen={row.original} meta={table.options.meta} />
        )
    },
];
