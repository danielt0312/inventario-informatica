import type { ColumnDef } from "@tanstack/react-table";
import type { TCatalogo } from "@/lib/types";
import { DictamenEstadoEnum } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FilePen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { Route, StateAction } from "@/routes/_auth/dictamenes/$id/$action";

export interface Dictamen {
    id: number;
    adscripcion: TCatalogo;
    fecha_solicitud: Date;
    estado: {
        id: DictamenEstadoEnum;
    };
    oficio: {
        folio: string
    }
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
                data.estado.id === DictamenEstadoEnum.DICTAMINAR && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to={Route.to}
                                params={{ id: data.id, action: StateAction[data.estado.id] }}
                            >
                                <Button size="icon" variant="secondary">
                                    <FilePen />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Dictaminar
                        </TooltipContent>
                    </Tooltip>
                )
            )
        }
    },
];
