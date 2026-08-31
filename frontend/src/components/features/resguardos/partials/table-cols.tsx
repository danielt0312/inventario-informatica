import { toLocaleDateFormat } from "@/lib/utils";
import type { Resguardo } from "@/types/resguardos";
import type { ColumnDef } from "@tanstack/react-table";

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
];

export {
    columns as resguardoTableColumns
}
