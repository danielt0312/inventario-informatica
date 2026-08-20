import type { TResponse, TCatalogo } from "@/types/generics";
import { QueryDataTable } from "@/components/ui/query-datatable";
import { ArticuloEstadoBadge, articuloTableColumns } from "./table-cols";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiselect";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { type Producto, type ProductoCategoria, type ProductoMarca, type ProductoTipo } from "@/types/productos";
import api from "@/lib/axios";

interface TableFilters {
    categoria: number[];
    tipo: number[];
    marca: number[];
    producto: number[];
    estado: number[];
    numero_inventario: string;
}

export function ArticuloTable() {
    const { filters, setFilters, debouncedFilters } = useDebouncedFilters<TableFilters>({
        categoria: [],
        tipo: [],
        marca: [],
        producto: [],
        estado: [],
        numero_inventario: '',
    });

    const { data: PRODUCTO_CATEGORIAS = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ProductoCategoria[]>>('api/producto_categorias')
            .then(r => r.data.data),
    });

    const { data: PRODUCTO_TIPOS = [] } = useQuery({
        queryKey: ['producto_tipos', debouncedFilters.categoria],
        queryFn: () => api.get<TResponse<ProductoTipo[]>>('api/producto_tipos', {
            params: {
                filters: {
                    categoria: debouncedFilters.categoria
                }
            }
        }).then(r => r.data.data),
        enabled: debouncedFilters.categoria.length > 0
    });

    const { data: PRODUCTO_MARCAS = [] } = useQuery({
        queryKey: ['producto_marcas', debouncedFilters.tipo],
        queryFn: () => api.get<TResponse<ProductoMarca[]>>('api/producto_marcas', {
            params: {
                filters: {
                    tipo: debouncedFilters.tipo,
                }
            }
        }).then(r => r.data.data),
        enabled: debouncedFilters.tipo.length > 0
    });

    const { data: PRODUCTOS = [] } = useQuery({
        queryKey: ['productos', debouncedFilters.tipo, debouncedFilters.marca],
        queryFn: () => api.get<TResponse<Producto[]>>('api/productos', {
            params: {
                filters: {
                    tipo: debouncedFilters.tipo,
                    marca: debouncedFilters.marca,
                }
            }
        }).then(r => r.data.data),
        enabled: debouncedFilters.tipo.length > 0
    });

    const { data: PRODUCTO_ESTADOS = [] } = useQuery({
        queryKey: ['articulo_estados'],
        queryFn: () => api.get<TResponse<TCatalogo[]>>('api/articulo_estados')
            .then(r => r.data.data)
    });

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
                        label="Categoría"
                        options={PRODUCTO_CATEGORIAS}
                        selected={filters.categoria.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            categoria: v.map(Number),
                            tipo: [],
                            marca: [],
                            producto: []
                        }))}
                    />
                    <MultiSelect
                        label="Producto"
                        options={PRODUCTO_TIPOS}
                        selected={filters.tipo.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            tipo: v.map(Number),
                            marca: [],
                            producto: []
                        }))}
                        emptyMessage={debouncedFilters.categoria.length === 0
                            ? 'Primero selecciona una categoría'
                            : undefined
                        }
                    />
                    <MultiSelect
                        label="Marca"
                        options={PRODUCTO_MARCAS}
                        selected={filters.marca.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            marca: v.map(Number),
                            producto: []
                        }))}
                        emptyMessage={debouncedFilters.producto.length === 0
                            ? 'Primero selecciona un producto'
                            : undefined
                        }
                    />
                    <MultiSelect
                        label="Modelo"
                        options={PRODUCTOS}
                        selected={filters.producto.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            producto: v.map(Number)
                        }))}
                        emptyMessage={debouncedFilters.producto.length === 0
                            ? 'Primero selecciona un producto'
                            : undefined
                        }
                    />
                    <MultiSelect
                        label="Estado"
                        options={PRODUCTO_ESTADOS}
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
