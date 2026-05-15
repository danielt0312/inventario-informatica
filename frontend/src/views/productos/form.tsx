import { toOptions } from "@/lib/utils";
import { useCategoriaQuery, useMarcaQuery, useProductoQuery, useTipoQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import { withFieldGroup } from "@/components/composed/@tanstack/form";
import z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { useStore } from "@tanstack/react-form";

export const CategoriaField = () => {
    const { data = [] } = useCategoriaQuery({
        select: toOptions
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Categoria:"
        />
    );
}

export const TipoField = ({
    categoria
}: {
    categoria: string
}) => {
    const { data = [] } = useTipoQuery({
        select: toOptions,
        categorias: [categoria],
        enabled: !!categoria
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Tipo:"
            enabled={!categoria}
        />
    );
}

export const MarcaField = ({
    tipo
}: {
    tipo: string
}) => {
    const { data = [] } = useMarcaQuery({
        select: toOptions,
        tipos: [tipo],
        enabled: !!tipo
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Marca:"
            enabled={!tipo}
        />
    );
}

export const ProductoField = ({
    tipo,
    marca
}: {
    tipo: string;
    marca: string;
}) => {
    const { data = [] } = useProductoQuery({
        select: toOptions,
        tipos: [tipo],
        marcas: [marca],
        enabled: !!marca
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Producto:"
            enabled={!marca}
        />
    );
}

export type ProductoFields = {
    categoria_id: string;
    tipo_id: string;
    marca_id: string;
    id: string;
}

export const defaultValues: ProductoFields = {
    categoria_id: '',
    tipo_id: '',
    marca_id: '',
    id: '',
}

export const validator = z.object({
    categoria_id: z
        .number()
        .int(),
    tipo_id: z
        .number()
        .int(),
    marca_id: z
        .number()
        .int(),
    id: z
        .number()
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
