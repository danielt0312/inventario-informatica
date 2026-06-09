import type { ColumnDef } from "@tanstack/react-table";
import { DictamenEstadoEnum } from "@/lib/constants";
import { Eye, FileInput, PackageOpen, Paperclip, Receipt } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
    isValidState,
    StateAction,
    type ActionDictamenEstadoEnum,
    Route as ActionRoute
} from "@/routes/_auth/dictamenes/$uuid/$action";
import { ActionMenu, ActionMenuItem } from "@/components/composed/action-menu";
import { Spinner } from "@/components/ui/spinner";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import type { Dictamen } from "./types";

const ActionIcon = {
    [DictamenEstadoEnum.DICTAMINAR]: <FileInput />,
    [DictamenEstadoEnum.EVIDENCIAR]: <Paperclip />,
    [DictamenEstadoEnum.SURTIR]: <Receipt />,
    [DictamenEstadoEnum.INVENTARIAR]: <PackageOpen />
} as const satisfies Record<ActionDictamenEstadoEnum, React.ReactNode>;

export function renderActionViewFile(dictamen: Dictamen) {
    if (!isValidState(dictamen.estado.id) || !dictamen.documento) return null;

    const { uuid, nombre } = dictamen.documento;
    const { mutate, isPending } = useFilePreviewWindowMutation(uuid, nombre ?? uuid);

    return (
        <ActionMenuItem
            disabled={isPending}
            onClick={() => mutate()}
        >
            {isPending
                ? <Spinner />
                : <Eye />
            } Ver documento
        </ActionMenuItem>
    );
}

export function renderActionCell(dictamen: Dictamen) {
    const { uuid } = dictamen;
    const value = dictamen.estado.id;

    if (!isValidState(value)) return null;

    const action = StateAction[value];

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
