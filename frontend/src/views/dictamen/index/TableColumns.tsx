"use client"

import type { ColumnDef } from "@tanstack/react-table"

export type Dictamen = {
    id: number
    area_solicitante: string
    fecha_solicitud: string
    estado: string
}

export const columns: ColumnDef<Dictamen>[] = [
    {
        accessorKey: "id",
        header: "Folio",
    },
    {
        accessorKey: "area_solicitante",
        header: "Área Solicitante",
    },
    {
        accessorKey: "fecha_solicitud",
        header: "Fecha de Solicitud",
    },
    {
        accessorKey: "estado",
        header: "Estado",
    },
    {
        accessorKey: "acciones",
        header: "Acciones",
    },
]
