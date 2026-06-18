import { toOptions } from "@/lib/utils";
import {
    useProductoQuery,
} from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import type { TResponse } from "@/types/generics";
import type { TOmitCreatableComboboxFieldsProps } from "@/components/composed/@tanstack/form-field";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ProductoTipoWithCategoria } from "@/types/productos";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const TipoField = (params: TOmitCreatableComboboxFieldsProps) => {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_tipos'],
        queryFn: () => api.get<TResponse<ProductoTipoWithCategoria[]>>('api/producto_tipos', {
            params: {
                include: 'categoria'
            }
        }).then(r => r.data.data),
        select: (data) => toOptions(data, 'categoria')
    });


    return (
        <>
            <CreatableComboboxField
                options={options}
                label="Tipo"
                onCreateRequest={(searchValue) => {
                    setOpen(true);
                }}
                {...params}
            />

        </>
    );
}

export const ProductoField = ({
    tipo,
    marca,
    ...props
}: TOmitCreatableComboboxFieldsProps<'disabled'> & {
    tipo: string;
    marca: string;
}) => {
    const { data = [] } = useProductoQuery({
        select: toOptions,
        tipos: tipo ? [Number(tipo)] : [],
        marcas: marca ? [Number(marca)] : [],
        enabled: !!marca
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Modelo"
            disabled={!marca}
            {...props}
        />
    );
}
