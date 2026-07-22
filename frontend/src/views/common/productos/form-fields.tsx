import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { ProductoWithMarca } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import { ProductoTipoField } from "./tipos/form-fields";
import { useFieldContext, withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { useStore } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";
import { SubmitButton } from "@/components/composed/@tanstack/form/form-components";

export type ProductoField = CreatableComboboxField;
export function ProductoField({
    label = "Modelo de Producto",
    tipo,
    disabled,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxField>, 'options' | 'onCreateRequest'> & {
    tipo: ProductoTipoField;
}) {
    const field = useFieldContext<ProductoField>();

    const { data: options = [] } = useQuery({
        queryKey: ['productos', tipo],
        queryFn: () => api.get<TResponse<ProductoWithMarca[]>>('api/productos', {
            params: {
                include: ['marca'],
                filter: {
                    tipos: tipo,
                }
            }
        }).then(r => r.data.data),
        select: (data) => toOptions(data, 'marca.nombre'),
        enabled: !disabled
    });

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (data, _, __, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['productos'] });
            field.handleChange(data.data.data.id);
        }
    });

    const dialogForm = useForm(useDialogFormMutation);
    dialogForm.setFieldValue('tipo_id', tipo);

    return (
        <>
            <CreatableComboboxField
                options={options}
                label={label}
                onCreateRequest={(searchValue) => {
                    dialogForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                disabled={disabled}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Modelo de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Creación de modelo de producto
                        </DialogDescription>
                    </DialogHeader>

                    <AppForm form={dialogForm} className="contents" showTipoField={false}>
                        <DialogFooter>
                            <SubmitButton />

                            <Button onClick={() => setDialogIsOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </AppForm>
                </DialogContent>
            </Dialog>
        </>
    );
}

export type ProductoGroupField = {
    tipo_id: ProductoTipoField;
    id: ProductoField;
};

const productoGroupDefaultValues: ProductoGroupField = {
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
