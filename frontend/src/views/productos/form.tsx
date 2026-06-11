import { toOptions } from "@/lib/utils";
import {
    useCategoriaQuery,
    useMarcaQuery,
    useProductoQuery,
    useTipoQuery
} from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import { withFieldGroup } from "@/components/composed/@tanstack/form";
import { FieldGroup } from "@/components/ui/field";
import { useStore } from "@tanstack/react-form";
import type { OmitCreatableComboboxFieldsProps } from "@/types/generics";
import { defaultValues } from "./form-schema";
import type { ComponentProps } from "react";

export const CategoriaField = ({
    ...params
}: OmitCreatableComboboxFieldsProps) => {
    const { data: options = [] } = useCategoriaQuery({
        select: toOptions
    });

    return (
        <CreatableComboboxField
            options={options}
            label="Categoria"
            {...params}
        />
    );
}

export const TipoField = ({
    categoria,
    ...params
}: OmitCreatableComboboxFieldsProps<'enabled'> & {
    categoria: string
}) => {
    const { data = [] } = useTipoQuery({
        select: toOptions,
        categorias: categoria ? [Number(categoria)] : [],
        enabled: !!categoria
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Tipo"
            enabled={!categoria}
            {...params}
        />
    );
}

export const MarcaField = ({
    tipo,
    ...props
}: OmitCreatableComboboxFieldsProps<'enabled'> & {
    tipo: string
}) => {
    const { data = [] } = useMarcaQuery({
        select: toOptions,
        tipos: tipo ? [Number(tipo)] : [],
        enabled: !!tipo
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Marca"
            enabled={!tipo}
            {...props}
        />
    );
}

export const ProductoField = ({
    tipo,
    marca,
    ...props
}: OmitCreatableComboboxFieldsProps<'enabled'> & {
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

export type Props = ComponentProps<typeof FieldGroup>;
export const defaultProps: Props = {} as const;

export const FieldGroupProductoFields = withFieldGroup({
    defaultValues,
    props: defaultProps,
    render: function Render({
        group,
        ...props
    }) {
        const categoria = useStore(group.store, (state) => state.values.categoria_id);
        const tipo = useStore(group.store, (state) => state.values.tipo_id);
        const marca = useStore(group.store, (state) => state.values.marca_id);

        return (
            <FieldGroup {...props}>
                <group.AppField
                    name="categoria_id"
                    children={() => <CategoriaField />}
                    listeners={{
                        onChange: () => {
                            group.setFieldValue('tipo_id', '');
                            group.setFieldValue('marca_id', '');
                            group.setFieldValue('id', '');
                        },
                    }}
                />
                <group.AppField
                    name="tipo_id"
                    children={() => <TipoField categoria={categoria} />}
                    listeners={{
                        onChange: () => {
                            group.setFieldValue('marca_id', '');
                            group.setFieldValue('id', '');
                        },
                    }}
                />
                <group.AppField
                    name="marca_id"
                    children={() => <MarcaField tipo={tipo} />}
                    listeners={{
                        onChange: () => {
                            group.setFieldValue('id', '');
                        },
                    }}
                />
                <group.AppField
                    name="id"
                    children={() => <ProductoField tipo={tipo} marca={marca} />}
                />
            </FieldGroup>
        );
    }
})
