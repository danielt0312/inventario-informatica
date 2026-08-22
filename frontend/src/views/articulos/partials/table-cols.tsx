import type { ColumnDef } from "@tanstack/react-table"
import type { Articulo, ArticuloEstado } from "@/types/articulos";
import { Badge } from "@/components/ui/badge";
import { ArticuloEstadoEnum } from "@/lib/constants";
import { cn, toLocaleDateFormat } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { SettingsIcon } from "lucide-react";
import { isArticuloEstadoRevision } from "@/components/features/articulos/utils";
import { Route as RevisionRoute } from "@/routes/_auth/articulos/$uuid/verificar-y-configurar";
import { RouterButton } from "@/components/ui/router-button";

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
);

const RevisionActionRow = ({ articulo }: { articulo: Articulo }) => {
    return (
        <RouterButton
            to={RevisionRoute.to}
            params={{
                uuid: articulo.uuid
            }}
            tooltip={{
                message: "Verificar y Configurar"
            }}
            size="icon"
            variant="outline"
        >
            <SettingsIcon />
        </RouterButton>
    );
}

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
            <EstadoBadge estado={row.original.estado} />
        )
    },
    {
        header: "Fecha de creación",
        accessorFn: (row) => toLocaleDateFormat(row.created_at)
    },
    {
        id: "action",
        cell: ({ row }) => {
            const articulo = row.original;

            return (
                <div className="flex gap-1">
                    {isArticuloEstadoRevision(articulo.estado.id) && <RevisionActionRow articulo={articulo} />}
                </div>
            );
        }
    }
];

export { columns as articuloTableColumns, estadoColorVariants as articuloEstadoColorVariants, EstadoBadge as ArticuloEstadoBadge }
