import { toOptions } from "@/lib/utils";
import { useCategoriaQuery, useMarcaQuery, useProductoQuery, useTipoQuery } from "./queries";
import { CreatableComboboxField, type CreatableComboboxFieldProps } from "@/components/composed/@tanstack/form-field";
import { withFieldGroup } from "@/components/composed/@tanstack/form";
import z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { useStore } from "@tanstack/react-form";
import type { IdValue } from "@/lib/types";

type OmitProps <
  TField extends number | string = string,
  TOmit extends keyof CreatableComboboxFieldProps<TField> = never
> = Omit <
  CreatableComboboxFieldProps<TField>,
  'options' | 'label' | TOmit
>;

export const CategoriaField = ({
    ...params
}: OmitProps) => {
    const { data = [] } = useCategoriaQuery({
        select: toOptions
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Categoria:"
            {...params}
        />
    );
}

export const TipoField = ({
    categoria,
    ...params
}: OmitProps<'enabled'> & {
    categoria: IdValue
}) => {
    const { data = [] } = useTipoQuery({
        select: toOptions,
        categorias: categoria ? [categoria] : [],
        enabled: !!categoria
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Tipo:"
            enabled={!categoria}
            {...params}
        />
    );
}

export const MarcaField = ({
    tipo,
    ...props
}: OmitProps<'enabled'> & {
    tipo: IdValue
}) => {
    const { data = [] } = useMarcaQuery({
        select: toOptions,
        tipos: tipo ? [tipo] : [],
        enabled: !!tipo
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Marca:"
            enabled={!tipo}
            {...props}
        />
    );
}

export const ProductoField = ({
    tipo,
    marca,
    ...props
}: OmitProps<'enabled'> & {
    tipo: IdValue;
    marca: IdValue;
}) => {
    const { data = [] } = useProductoQuery({
        select: toOptions,
        tipos: tipo ? [tipo] : [],
        marcas: marca ? [marca] : [],
        enabled: !!marca
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Producto:"
            enabled={!marca}
            {...props}
        />
    );
}

export type ProductoFields = {
    categoria_id: IdValue;
    tipo_id: IdValue;
    marca_id: IdValue;
    id: IdValue;
}

export const defaultValues: ProductoFields = {
    categoria_id: null,
    tipo_id: null,
    marca_id: null,
    id: null,
}

export const validator = z.object({
    categoria_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    tipo_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    marca_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    id: z
        .number('Debes de seleccionar una opción')
        .int(),
});

export const FieldGroupProductoFields = withFieldGroup({
    defaultValues,
    render: function Render({ group }) {
        const categoria = useStore(group.store, (state) => state.values.categoria_id);
        const tipo = useStore(group.store, (state) => state.values.tipo_id);
        const marca = useStore(group.store, (state) => state.values.marca_id);

        return (
            <FieldGroup className="md:grid md:grid-cols-2 xl:grid-cols-4 ">
                <group.AppField
                    name="categoria_id"
                    children={() => <CategoriaField />}
                />
                <group.AppField
                    name="tipo_id"
                    children={() => <TipoField categoria={categoria} />}
                />
                <group.AppField
                    name="marca_id"
                    children={() => <MarcaField tipo={tipo} />}
                />
                <group.AppField
                    name="id"
                    children={() => <ProductoField tipo={tipo} marca={marca} />}
                />
            </FieldGroup>
        );
    }
})
