import { Badge } from "@/components/ui/badge";
import { ResguardoEstadoEnum } from "@/lib/constants";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import type { Resguardo, ResguardoEstado } from "@/types/resguardos";
import type { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";

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
    }
];

export {
    columns as resguardoTableColumns,
    EstadoBadge as ResguardoEstadoBadge
}
