import type { ColumnDef, RowData } from "@tanstack/react-table"
import type { Articulo, ArticuloEstado } from "@/types/articulos";
import type { RowDataAccessorFn } from "@/types/generics";
import { Badge } from "@/components/ui/badge";
import { ArticuloEstadoEnum } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
                [ArticuloEstadoEnum.MANTENIMIENTO]: "bg-yellow-400/50",
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

type AccessorFn<TRowData extends RowData> = RowDataAccessorFn<TRowData, Articulo>;

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
                ? <span className="text-muted-foreground italic">N/A</span>
                : numeroSerie
        );
    }
});

const DescripcionRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.descripcion',
    header: 'Descripción',
    accessorFn: (row) => getRowData(row).producto.tipo.nombre
});

const MarcaRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.marca',
    header: 'Marca',
    accessorFn: (row) => getRowData(row).producto.marca.nombre
});

const ModeloRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.modelo',
    header: 'Modelo',
    accessorFn: (row) => getRowData(row).producto.nombre
});

const EstadoRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'articulo.estado',
    header: 'Estado',
    cell: ({ row }) => {
        const articulo = getRowData(row.original);
        return (
            <div className="flex flex-col gap-1">
                <EstadoBadge estado={articulo.estado} />
                {articulo.es_inventariable !== null && (
                    <Badge variant="outline">
                        {articulo.es_inventariable ? 'Es inventariable' : 'No es inventariable'}
                    </Badge>
                )}
                {articulo.observaciones && (
                    <Badge className="bg-red-400/80 text-black">
                        Tiene observaciones
                    </Badge>
                )}
            </div>
        );
    }
});

const defaultColumnsBuilder = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData>[] => ([
    NumeroInventarioRow(getRowData),
    NumeroSerieRow(getRowData),
    DescripcionRow(getRowData),
    MarcaRow(getRowData),
    ModeloRow(getRowData),
    EstadoRow(getRowData)
]);

const columns: ColumnDef<Articulo>[] = [
    ...defaultColumnsBuilder<Articulo>(row => row)
];

export { columns as articuloTableColumns, estadoColorVariants as articuloEstadoColorVariants, EstadoBadge as ArticuloEstadoBadge, defaultColumnsBuilder as articuloDefaultColumnsBuilder, type AccessorFn as ArticuloRowDataAccessorFn }
