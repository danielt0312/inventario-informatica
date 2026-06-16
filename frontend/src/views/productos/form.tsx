import { toOptions } from "@/lib/utils";
import {
    useProductoQuery,
} from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import type { TOmitCreatableComboboxFieldsProps, TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ProductoTipoWithCategoria } from "@/types/productos";

export const TipoField = (params: TOmitCreatableComboboxFieldsProps) => {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_tipos'],
        queryFn: () => api.get<TResponse<ProductoTipoWithCategoria[]>>('api/producto_tipos', {
            params: {
                include: 'categoria'
            }
        }).then(r => r.data.data),
        select: (data) => toOptions(data, 'categoria')
    })

    return (
        <CreatableComboboxField
            options={options}
            label="Tipo"
            {...params}
        />
    );
}

export const ProductoField = ({
    tipo,
    marca,
    ...props
}: TOmitCreatableComboboxFieldsProps<'enabled'> & {
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
            enabled={!marca}
            {...props}
        />
    );
}
