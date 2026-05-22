import { QueryDataTable } from "@/components/custom/query-datatable";
import { columns, type Articulo } from "./table.cols";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/custom/multiselect";
import { useCategoriaQuery, useMarcaQuery, useProductoQuery, useTipoQuery } from "@/views/productos/queries";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse, TCatalogo } from "@/lib/types";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/inventario/create";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";

interface TableFilters {
    categorias: number[];
    tipos: number[];
    marcas: number[];
    productos: number[];
    estados: number[];
    numero_inventario: string;
}

export function Table() {
    const { filters, setFilters, debouncedFilters } = useDebouncedFilters<TableFilters>({
        categorias: [],
        tipos: [],
        marcas: [],
        productos: [],
        estados: [],
        numero_inventario: '',
    });

    const { data: PRODUCTO_CATEGORIAS = [] } = useCategoriaQuery();

    const { data: PRODUCTO_TIPOS = [] } = useTipoQuery({
        categorias: debouncedFilters.categorias,
        enabled: debouncedFilters.categorias.length > 0
    });

    const { data: PRODUCTO_MARCAS = [] } = useMarcaQuery({
        tipos: debouncedFilters.tipos,
        enabled: debouncedFilters.tipos.length > 0
    });

    const { data: PRODUCTOS = [] } = useProductoQuery({
        tipos: debouncedFilters.tipos,
        marcas: debouncedFilters.marcas,
        enabled: debouncedFilters.tipos.length > 0
    });

    const { data: PRODUCTO_ESTADOS = [] } = useQuery({
        queryKey: ['articulo_estados'],
        queryFn: () => api.get<TResponse<TCatalogo[]>>('api/articulo_estados')
            .then(r => r.data.data)
    });

    return (
        <QueryDataTable<Articulo, TableFilters>
            queryKey={["articulos"]}
            url="api/articulos"
            filters={debouncedFilters}
            columns={columns}
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
                        selected={filters.categorias.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            categorias: v.map(Number),
                            tipos: [],
                            marcas: [],
                            productos: []
                        }))}
                    />
                    <MultiSelect
                        label="Producto"
                        options={PRODUCTO_TIPOS}
                        selected={filters.tipos.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            tipos: v.map(Number),
                            marcas: [],
                            productos: []
                        }))}
                        emptyMessage={() => debouncedFilters.categorias.length === 0
                            ? 'Primero selecciona una categoría'
                            : undefined
                        }
                    />
                    <MultiSelect
                        label="Marca"
                        options={PRODUCTO_MARCAS}
                        selected={filters.marcas.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            marcas: v.map(Number),
                            productos: []
                        }))}
                        emptyMessage={() => debouncedFilters.productos.length === 0
                            ? 'Primero selecciona un producto'
                            : undefined
                        }
                    />
                    <MultiSelect
                        label="Modelo"
                        options={PRODUCTOS}
                        selected={filters.productos.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            productos: v.map(Number)
                        }))}
                        emptyMessage={() => debouncedFilters.productos.length === 0
                            ? 'Primero selecciona un producto'
                            : undefined
                        }
                    />
                    <MultiSelect
                        label="Estado"
                        options={PRODUCTO_ESTADOS}
                        selected={filters.estados.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            estados: v.map(Number)
                        }))}
                    />
                </>
            )}
            actionBar={(
                <ButtonGroup>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm">
                                <PlusCircle /> Registrar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <Link to={Route.to}>
                                    <DropdownMenuItem>
                                        Artículo Existente
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    Ingreso por Dictámen Tecnológico
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ButtonGroup>
            )}
        />
    )
};
