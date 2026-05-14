import { DataTable } from "@/components/composed/datatable";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columns, type Articulo } from "./table.cols";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/inventario/create";
import type { PaginatedResponse, TCatalogo } from "@/lib/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { MultiSelect } from "@/components/custom/multiselect";
import { useCategoriaQuery, useMarcaQuery, useProductoQuery, useTipoQuery } from "@/views/productos/queries";

interface TableFilters {
    categorias: number[];
    tipos: number[];
    marcas: number[];
    productos: number[];
    estados: number[];
    numero_inventario: string;
}

export function Table() {
    const [filters, setFilters] = useState<TableFilters>({
        categorias: [],
        tipos: [],
        marcas: [],
        productos: [],
        estados: [],
        numero_inventario: "",
    });
    const debounceFilters = useDebounce(filters);

    const { data: PRODUCTO_CATEGORIAS = [] } = useCategoriaQuery();

    const { data: PRODUCTO_TIPOS = [] } = useTipoQuery({
        categorias: debounceFilters.categorias,
        enabled: debounceFilters.categorias.length > 0
    });

    const { data: PRODUCTO_MARCAS = [] } = useMarcaQuery({
        tipos: debounceFilters.tipos,
        enabled: debounceFilters.tipos.length > 0
    });

    const { data: PRODUCTOS = [] } = useProductoQuery({
        tipos: debounceFilters.tipos,
        marcas: debounceFilters.marcas,
        enabled: debounceFilters.tipos.length > 0
    });

    const { data: PRODUCTO_ESTADOS = [] } = useQuery({
        queryKey: ['articulo_estados'],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/articulo_estados')
            .then(r => r.data.data)
    });

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const query = useQuery({
        queryKey: ['articulos', debounceFilters, pagination],
        queryFn: () => api.get<PaginatedResponse<Articulo>>('api/articulos', {
            params: {
                ...debounceFilters,
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize
            }
        }).then(r => r.data),
        staleTime: 60 * 1000
    });

    const table = useReactTable({
        data: query.data?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        rowCount: query.data?.total ?? 0,
        state: { pagination }
    });

    return (
        <DataTable
            table={table}
            query={query}
            filterBar={() => (
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
                        emptyMessage={() => debounceFilters.categorias.length === 0
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
                        emptyMessage={() => debounceFilters.productos.length === 0
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
                        emptyMessage={() => debounceFilters.productos.length === 0
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
            actionBar={() => (
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
    );
}
