import type { ColumnDef } from "@tanstack/react-table";
import type { TCatalogo } from "@/lib/types";
import { DictamenEstadoEnum } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FileInput } from "lucide-react";

export interface Dictamen {
    id: number;
    adscripcion: TCatalogo;
    fecha_solicitud: Date;
    estado: TCatalogo;
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
                data.estado.id === DictamenEstadoEnum.POR_DICTAMINAR && (
                    <Button size="icon" variant="secondary">
                        <FileInput />
                    </Button>
                )
            )
        }
    },
];
