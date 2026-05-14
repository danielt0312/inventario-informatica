import { withFieldGroup } from "@/components/composed/@tanstack/form";
import { toOptions } from "@/lib/utils";
import { useCategoriaQuery, useMarcaQuery, useProductoQuery, useTipoQuery } from "./queries";
import { useStore } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";

export type Fields = {
    categoria_id: string;
    tipo_id: string;
    marca_id: string;
    id: string;
}

const defaultValues: Fields = {
    categoria_id: '',
    tipo_id: '',
    marca_id: '',
    id: '',
}

// Extrae el tipo de 'group' del callback render
type InferGroup<T extends (config: any) => any> =
    Parameters
        Parameters<T>[0]['render']
    >[0]['group']

// Úsalo con tus Fields específicos
export type ProductoGroup = InferGroup<typeof withFieldGroup<Fields>>

export const ProductoFieldGroup = withFieldGroup({
    defaultValues,
    render: function Render({ group }) {
        const categoria = useStore(group.store, (state) => state.values.categoria_id);
        const tipo = useStore(group.store, (state) => state.values.tipo_id);
        const marca = useStore(group.store, (state) => state.values.marca_id);

        const { data: CATEGORIAS = [] } = useCategoriaQuery({
            select: toOptions
        });

        const { data: TIPOS = [] } = useTipoQuery({
            select: toOptions,
            categorias: [categoria],
            enabled: !!categoria
        });

        const { data: MARCAS = [] } = useMarcaQuery({
            select: toOptions,
            tipos: [tipo],
            enabled: !!tipo
        });

        const { data: PRODUCTOS = [] } = useProductoQuery({
            select: toOptions,
            tipos: [tipo],
            marcas: [marca],
            enabled: !!tipo && !!marca
        });

        return (
            <FieldGroup className="grid grid-cols-2">
                <group.AppField
                    name="categoria_id"
                    children={(field) => (
                        <field.FormCreatableComboboxField
                            label="Categoría:"
                            options={CATEGORIAS}
                        />
                    )}
                />
                <group.AppField
                    name="tipo_id"
                    children={(field) => (
                        <field.FormCreatableComboboxField
                            label="Producto:"
                            options={TIPOS}
                            enabled={!categoria}
                        />
                    )}
                />
                <group.AppField
                    name="marca_id"
                    children={(field) => (
                        <field.FormCreatableComboboxField
                            label="Marca:"
                            options={MARCAS}
                            enabled={!tipo}
                        />
                    )}
                />
                <group.AppField
                    name="id"
                    children={(field) => (
                        <field.FormCreatableComboboxField
                            label="Producto:"
                            options={PRODUCTOS}
                            enabled={!tipo}
                        />
                    )}
                />
            </FieldGroup>
        );
    }
})
