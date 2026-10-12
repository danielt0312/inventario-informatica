import type { ColumnDef, RowData } from "@tanstack/react-table"
import type { Articulo, DetailedArticulo } from "@/types/articulos";
import type { RowDataAccessorFn } from "@/types/generics";
import { Badge } from "@/components/ui/badge";
import { ProductoTipoEnum } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { RouterButton } from "@/components/ui/router-button";
import { Route } from "@/routes/_auth/articulos/$uuid/actualizar";
import { CircleFadingArrowUpIcon } from "lucide-react";
import { EmptyValue } from "@/components/ui/empty-value";
import { ArticuloEstadoBadge } from "./estado-badge";

type AccessorFn<TRowData extends RowData, TArticulo extends Articulo = Articulo> = RowDataAccessorFn<TRowData, TArticulo>;

const NumeroInventarioRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.numero_inventario',
    header: 'No. Inventario',
    accessorFn: (row) => getRowData(row).numero_inventario
});

const NumeroSerieRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.numero_serie',
    header: 'No. Serie',
    cell: ({ row: { original } }) => {
        const numeroSerie = getRowData(original).numero_serie;
        return (
            numeroSerie === null
                ? <EmptyValue />
                : numeroSerie
        );
    }
});

const DescripcionRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.descripcion',
    header: 'Descripción',
    accessorFn: (row) => getRowData(row).producto_variante.tipo.nombre
});

const MarcaRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.marca',
    header: 'Marca',
    accessorFn: (row) => getRowData(row).producto_variante.marca.nombre
});

const ModeloRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.modelo',
    header: 'Modelo',
    accessorFn: (row) => getRowData(row).producto_variante.modelo
});

const inventariabilidadBadgeVariants = cva(
    undefined,
    {
        variants: {
            variant: {
                inventariable: "text-foreground bg-lime-300/70",
                "no-inventariable": "text-foreground bg-yellow-400/50"
            }
        },
    }
);

const InventariabilidadBadge = ({
    variant,
    className,
    ...props
}: VariantProps<typeof inventariabilidadBadgeVariants> & Omit<React.ComponentProps<typeof Badge>, 'variant'>) => (
    <Badge
        className={cn(inventariabilidadBadgeVariants({ variant }), className)}
        {...props}
    >
        {variant === 'inventariable' ? 'Inventariable' : 'No Inventariable'}
    </Badge>
);

const EstadoRow = <TRowData, TDetailedArticulo extends DetailedArticulo>(getRowData: AccessorFn<TRowData, TDetailedArticulo>): ColumnDef<TRowData> => ({
    id: 'articulo.estado',
    header: 'Estado',
    cell: ({ row }) => {
        const articulo = getRowData(row.original);
        return (
            <div className="flex flex-col gap-1">
                <ArticuloEstadoBadge estado={articulo.estado} />
                {articulo.es_inventariable !== null && <InventariabilidadBadge variant={articulo.es_inventariable ? 'inventariable' : 'no-inventariable'} />}
                {articulo.surtimiento?.observaciones && (
                    <Badge className="bg-red-400/80 text-black">
                        Tiene Observaciones
                    </Badge>
                )}
            </div>
        );
    }
});

const baseColumnsBuilder = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData>[] => ([
    NumeroInventarioRow(getRowData),
    NumeroSerieRow(getRowData),
    DescripcionRow(getRowData),
    MarcaRow(getRowData),
    ModeloRow(getRowData),
]);

const defaultColumns: ColumnDef<DetailedArticulo>[] = [
    ...baseColumnsBuilder<DetailedArticulo>((row) => row),
    EstadoRow((row) => row),
    {
        id: "actions",
        cell: ({ row }) => {
            const articulo = row.original;
            const productoTipo = articulo.producto_variante.tipo;

            return (
                <div className="flex gap-1">
                    {productoTipo.id === ProductoTipoEnum.Computadora && (
                        <RouterButton
                            to={Route.to}
                            params={{
                                uuid: articulo.uuid
                            }}
                            size="icon"
                            variant="outline"
                            tooltip={{
                                content: "Actualizar"
                            }}
                        >
                            <CircleFadingArrowUpIcon />
                        </RouterButton>
                    )}
                </div>
            );
        }
    }
];

export {
    defaultColumns as articuloTableColumns,
    baseColumnsBuilder as articuloBaseColumnsBuilder,
    InventariabilidadBadge as ArticuloInventariabilidadBadge,
    type AccessorFn as ArticuloRowDataAccessorFn
}
