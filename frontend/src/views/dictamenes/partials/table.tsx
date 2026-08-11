import { QueryDataTable, SearchInput } from "@/components/ui/query-datatable";
import { columns } from "./table-cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "@/components/ui/multiselect";
import api from "@/lib/axios";
import type { TResponse, TCatalogo } from "@/types/generics";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route as CreateRoute } from "@/routes/_auth/dictamenes/create";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { DictamenEstadoEnum } from "@/lib/constants";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface TableFilters {
    folio: string;
    estados: string[];
}

const estadoVariants = cva(
    "px-1.5 py-1 rounded-sm",
    {
        variants: {
            variant: {
                default: undefined,
                [DictamenEstadoEnum.DICTAMINAR]: "bg-red-400/90",
                [DictamenEstadoEnum.EVIDENCIAR]: "bg-orange-400/80",
                [DictamenEstadoEnum.SURTIR]: "bg-yellow-300",
                [DictamenEstadoEnum.INVENTARIAR]: "bg-yellow-400",
                [DictamenEstadoEnum.SURTIDO]: "bg-lime-400",
                [DictamenEstadoEnum.SURTIDO_PARCIAL]: "bg-green-400",
                [DictamenEstadoEnum.SURTIDO_CON_OBSERVACIONES]: "bg-emerald-400",
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

export function Table() {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        folio: '',
        estados: []
    });

    const { mutate, isPending: isPreviewing } = useFilePreviewWindowMutation();

    const { data: ESTADOS = [] } = useQuery({
        queryKey: ['dictamen_estados'],
        queryFn: () => api.get<TResponse<TCatalogo[]>>('api/dictamen_estados')
            .then(r => r.data.data),
    });

    return (
        <QueryDataTable
            columns={columns}
            filter={debouncedFilters}
            url="api/dictamenes"
            queryKey={['dictamenes']}
            filterBar={(
                <>
                    <SearchInput
                        value={filters.folio}
                        placeholder="Folio de solicitud"
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            folio: e.target.value
                        }))}
                    />

                    <MultiSelect
                        label="Estado"
                        options={ESTADOS}
                        onOptionRender={(option) => (
                            <span className={cn(estadoVariants({ variant: option.id as DictamenEstadoEnum }))}>
                                {option.nombre}
                            </span>
                        )}
                        selected={filters.estados}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            estados: v
                        }))}
                    />
                </>
            )}
            actionBar={(
                <Link to={CreateRoute.to}>
                    <Button size="sm">
                        <PlusCircle /> Crear
                    </Button>
                </Link>
            )}
            tableOptions={{
                meta: {
                    previewFile: (uuid, title) => mutate({ uuid, title }),
                    isPreviewing
                }
            }}
        />
    );
}

export {
    estadoVariants as dictamenEstadoVariants
}
