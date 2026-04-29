import { DataTable } from "@/components/composed/datatable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns, type Articulo } from "./table.cols";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/inventario/create";

export function Table() {
    const query = useQuery({
        queryKey: ['articulos'],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: Articulo[] }>('api/articulos')
            return axiosData.data;
        }
    });

    const table = useReactTable({
        data: query.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <DataTable
            table={table}
            query={query}
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
