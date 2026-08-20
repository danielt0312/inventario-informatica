import { Badge } from "@/components/ui/badge";
import { ArticuloEstadoEnum } from "@/lib/constants";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import type { Articulo, ArticuloEstado } from "@/types/articulos";
import type { ColumnDef } from "@tanstack/react-table"
import { cva } from "class-variance-authority";

const estadoColorVariants = cva(
    "text-black",
    {
        variants: {
            variant: {
                default: undefined,
                [ArticuloEstadoEnum.ACTIVO]: "bg-lime-400",
                [ArticuloEstadoEnum.BAJA]: "bg-red-400",
                [ArticuloEstadoEnum.BAJA_PREVENTIVA]: "bg-red-400/80",
                [ArticuloEstadoEnum.MANTENIMIENTO]: "bg-yellow-400",
                [ArticuloEstadoEnum.REVISION]: "bg-yellow-400/50"
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
    estado: ArticuloEstado
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
)

const columns: ColumnDef<Articulo>[] = [
    {
        header: "No. de Inventario",
        accessorKey: "numero_inventario"
    },
    {
        header: "Categoría",
        accessorFn: (row) => row.producto.tipo.categoria.nombre
    },
    {
        header: "Producto",
        accessorFn: (row) => row.producto.tipo.nombre
    },
    {
        header: "Marca",
        accessorFn: (row) => row.producto.marca.nombre
    },
    {
        header: "Modelo",
        accessorFn: (row) => row.producto.nombre
    },
    {
        header: "Estado",
        cell: ({ row }) => (
            <EstadoBadge  estado={row.original.estado} />
        )
    },
    {
        header: "Fecha de creación",
        accessorFn: (row) => toLocaleDateFormat(row.created_at)
    },
];

export { columns as articuloTableColumns, estadoColorVariants as articuloEstadoColorVariants, EstadoBadge as ArticuloEstadoBadge }
