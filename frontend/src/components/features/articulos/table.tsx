import { QueryDataTable } from "@/components/ui/query-datatable";
import { ArticuloEstadoBadge, articuloTableColumns } from "./table-cols";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiselect";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { productoMarcaQueryOptions, productoTipoQueryOptions } from "../productos/queries";
import { articuloEstadoQueryOptions } from "./queries";

interface TableFilters {
    tipo: number[];
    marca: number[];
    estado: number[];
    numero_inventario: string;
}

export function ArticuloTable() {
    const { filters, setFilters, debouncedFilters } = useDebouncedFilters<TableFilters>({
        tipo: [],
        marca: [],
        estado: [],
        numero_inventario: '',
    });

    const { data: productoTipos = [] } = useQuery(productoTipoQueryOptions);

    const { data: productoMarcas = [] } = useQuery(productoMarcaQueryOptions);

    const { data: articuloEstados = [] } = useQuery(articuloEstadoQueryOptions);

    return (
        <QueryDataTable
            queryKey={["articulos"]}
            url="api/articulos"
            filter={debouncedFilters}
            columns={articuloTableColumns}
            filterBar={(
                <>
                    <Input
                        placeholder="Número de Inventario..."
                        value={filters.numero_inventario}
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            numero_inventario: e.target.value
                        }))}
                        className="max-w-sm h-8"
                    />
                    <MultiSelect
                        label="Producto"
                        options={productoTipos}
                        selected={filters.tipo.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            tipo: v.map(Number),
                            marca: [],
                            producto: []
                        }))}
                    />
                    <MultiSelect
                        label="Marca"
                        options={productoMarcas}
                        selected={filters.marca.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            marca: v.map(Number),
                            producto: []
                        }))}
                    />
                    <MultiSelect
                        label="Estado"
                        options={articuloEstados}
                        onOptionRender={(option) => (
                            <ArticuloEstadoBadge estado={option} />
                        )}
                        selected={filters.estado.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            estado: v.map(Number)
                        }))}
                    />
                </>
            )}
        />
    )
};
