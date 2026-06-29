import type { ColumnDef } from "@tanstack/react-table";
import { DictamenEstadoEnum } from "@/lib/constants";
import { EyeIcon, FileInputIcon, PackageOpenIcon, PackagePlus, PackagePlusIcon, PaperclipIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
    isActionState,
    Route as ActionRoute
} from "@/routes/_auth/dictamenes/$uuid/$action";
import { ActionMenu, ActionMenuItem } from "@/components/composed/action-menu";
import { Spinner } from "@/components/ui/spinner";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import type { Dictamen } from "@/types/dictamenes";
import { ActionStates } from "@/routes/_auth/dictamenes/$uuid/-types";

const ActionIcon = {
    [DictamenEstadoEnum.DICTAMINAR]: <FileInputIcon />,
    [DictamenEstadoEnum.EVIDENCIAR]: <PaperclipIcon />,
    [DictamenEstadoEnum.SURTIR]: <PackagePlusIcon />,
    [DictamenEstadoEnum.INVENTARIAR]: <PackageOpenIcon />,
    [DictamenEstadoEnum.RESGUARDAR]: <PackagePlus />
} as const;

export function renderActionViewFile(dictamen: Dictamen) {
    if (!isActionState(dictamen.estado.id) || !dictamen.documento) return null;

    const { uuid, nombre } = dictamen.documento;
    const { mutate, isPending } = useFilePreviewWindowMutation();

    return (
        <ActionMenuItem
            disabled={isPending}
            onClick={() => mutate({ uuid, title: nombre || uuid })}
        >
            {isPending
                ? <Spinner />
                : <EyeIcon />
            } Ver documento
        </ActionMenuItem>
    );
}

export function renderActionCell(dictamen: Dictamen) {
    const { uuid } = dictamen;
    const value = dictamen.estado.id;

    if (!isActionState(value)) return null;

    const action = ActionStates[value];

    return (
        <>
            <Link
                to={ActionRoute.to}
                params={{
                    uuid,
                    action
                }}
            >
                <ActionMenuItem className="capitalize">
                    {ActionIcon[value]} {action}
                </ActionMenuItem>
            </Link>
            {renderActionViewFile(dictamen)}
        </>
    );
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
        cell: ({ row: { original: data } }) => {
            return (
                <ActionMenu>
                    {renderActionCell(data)}
                </ActionMenu>
            )
        }
    },
];
