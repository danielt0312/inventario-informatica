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
import { DataTableFilter } from "@/components/ui/datatable";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function Table() {
    const [categorias, setCategorias] = useState<number[]>([]);
    const debouncedCategorias = useDebounce(categorias);

    const [tipos, setTipos] = useState<number[]>([]);
    const debouncedTipos = useDebounce(tipos);

    const [marcas, setMarcas] = useState<number[]>([]);
    const debouncedMarcas = useDebounce(marcas);

    const [modelos, setModelos] = useState<number[]>([]);
    const debouncedModelos = useDebounce(modelos);

    const [estados, setEstados] = useState<number[]>([]);
    const debouncedEstados = useDebounce(estados);

    const [numeroInventario, setNumeroInventario] = useState('');
    const debouncedNumeroInventario = useDebounce(numeroInventario, 500);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const query = useQuery({
        queryKey: ['articulos', debouncedNumeroInventario, debouncedCategorias, debouncedTipos, debouncedMarcas, debouncedModelos, debouncedEstados, pagination],
        queryFn: () => api.get<PaginatedResponse<Articulo>>('api/articulos', {
            params: {
                numero_inventario: debouncedNumeroInventario ?? undefined,
                categorias,
                tipos,
                marcas,
                modelos,
                estados,
                pagination
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

    const { data: PRODUCTO_CATEGORIAS = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_categorias')
            .then(r => r.data.data)
    });

    const { data: PRODUCTO_TIPOS = [] } = useQuery({
        queryKey: ['producto_tipos', debouncedCategorias],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_tipos', {
            params: {
                categorias
            }
        }).then(r => r.data.data)
    });

    const { data: PRODUCTO_MARCAS = [] } = useQuery({
        queryKey: ['producto_marcas', debouncedTipos],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_marcas', {
            params: {
                tipos
            }
        }).then(r => r.data.data)
    });

    const { data: PRODUCTOS = [] } = useQuery({
        queryKey: ['productos', debouncedTipos, debouncedMarcas],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/productos', {
            params: {
                tipos,
                marcas
            }
        }).then(r => r.data.data)
    });

    const { data: PRODUCTO_ESTADOS = [] } = useQuery({
        queryKey: ['producto_estados'],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/productos').then(r => r.data.data)
    });

    return (
        <DataTable
            table={table}
            query={query}
            filterBar={() => (
                <>
                    <Input
                        placeholder="Número de Inventario..."
                        value={numeroInventario}
                        onChange={(e) => setNumeroInventario(e.target.value)}
                        className="max-w-sm h-8"
                    />
                    <DataTableFilter
                        label="Categoría"
                        filters={PRODUCTO_CATEGORIAS}
                        selectedFilters={categorias}
                        setSelectedFilters={setCategorias}
                    />
                    <DataTableFilter
                        label="Producto"
                        filters={PRODUCTO_TIPOS}
                        selectedFilters={tipos}
                        setSelectedFilters={setTipos}
                    />
                    <DataTableFilter
                        label="Marca"
                        filters={PRODUCTO_MARCAS}
                        selectedFilters={marcas}
                        setSelectedFilters={setMarcas}
                    />
                    <DataTableFilter
                        label="Modelo"
                        filters={PRODUCTOS}
                        selectedFilters={modelos}
                        setSelectedFilters={setModelos}
                    />
                    <DataTableFilter
                        label="Estado"
                        filters={PRODUCTO_ESTADOS}
                        selectedFilters={estados}
                        setSelectedFilters={setEstados}
                        children={(filter) => filter.nombre}
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
