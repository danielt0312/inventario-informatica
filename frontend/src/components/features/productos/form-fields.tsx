import type { TResponse } from "@/types/generics";
import type { ProductoMarca, ProductoWithMarca } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { useCreateProductoForm, useCreateProductoFormMutation } from "./create/form";
import { ProductoTipoField, type ProductoTipoFieldType } from "./tipos/form-fields";
import { useFieldContext, withFieldGroup } from "@/components/ui/form-context";
import { useStore } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";
import React from "react";
import api from "@/lib/axios";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { CreatableComboboxFieldGrouped } from "@/components/ui/creatable-combobox-field-grouped";
import { toComboboxGroups } from "@/components/ui/combobox-layout.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { ProductoMarcaField } from "./marcas/form-fields";
import { ProductoNombreField } from "./create/form-fields";
import { Form } from "@/components/ui/form";

export type ProductoFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;
export function ProductoField({
    layout,
    tipo,
    disabled,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldGrouped>, 'items' | 'onCreate'> & {
    tipo: ProductoTipoFieldType;
}) {
    const field = useFieldContext<ProductoFieldType>();

    const { data = [] } = useQuery({
        queryKey: ['productos', tipo],
        queryFn: () => api.get<TResponse<ProductoWithMarca[]>>('api/productos', {
            params: {
                include: ['marca'],
                filter: {
                    tipo,
                }
            }
        }).then(r => r.data.data),
        enabled: !disabled
    });

    const items = React.useMemo(() => {
        const marcasDisponibles: ProductoMarca[] = [];
        data.forEach((productoWithMarca) => {
            if (marcasDisponibles.some((marcaDisponible) => marcaDisponible.id === productoWithMarca.marca.id)) {
                return;
            }
            marcasDisponibles.push(productoWithMarca.marca);
        });
        return toComboboxGroups(marcasDisponibles, (marcaDisponible) => {
            const productos = data.filter((productoWithMarca) => marcaDisponible.id === productoWithMarca.marca.id);
            return {
                label: marcaDisponible.nombre,
                items: toComboboxCatalogItems(productos)
            };
        });
    }, [data]);

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useCreateProductoFormMutation({
        onSuccess: (data, _, __, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['productos'] });
            field.handleChange(data.data.data.id);
        }
    });

    const form = useCreateProductoForm(useDialogFormMutation);
    form.setFieldValue('tipo_id', tipo);

    return (
        <>
            <CreatableComboboxFieldGrouped
                items={items}
                layout={{
                    label: "Modelo de Producto",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    form.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                disabled={disabled}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Modelo de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo modelo de producto
                        </DialogDescription>
                    </DialogHeader>

                    <Form form={form} className="contents">
                        <form.AppField name="tipo_id" children={() => <ProductoTipoField disabled />} />
                        <form.AppField name="marca_id" children={() => <ProductoMarcaField />} />
                        <form.AppField name="nombre" children={() => <ProductoNombreField />} />

                        <DialogFooter>
                            <form.SubmitFormButton />

                            <Button onClick={() => setDialogIsOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export type ProductoGroupFieldType = {
    tipo_id: ProductoTipoFieldType;
    id: ProductoFieldType;
};

const productoGroupDefaultValues: ProductoGroupFieldType = {
    id: undefined,
    tipo_id: undefined,
};

export const ProductoGroupField = withFieldGroup({
    defaultValues: productoGroupDefaultValues,
    props: {} as React.ComponentProps<typeof FieldGroup>,
    render: ({ group, ...props }) => {
        const tipo = useStore(group.store, (state) => state.values.tipo_id);

        return (
            <FieldGroup {...props}>
                <group.AppField
                    name="tipo_id"
                    children={() => <ProductoTipoField />}
                    listeners={{
                        onChange: () => group.setFieldValue('id', undefined)
                    }}
                />

                <group.AppField
                    name="id"
                    children={() =>
                        <ProductoField tipo={tipo} disabled={tipo === undefined} />
                    }
                />
            </FieldGroup>
        );
    }
});
