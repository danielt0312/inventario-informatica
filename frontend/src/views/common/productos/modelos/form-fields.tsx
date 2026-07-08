import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { Producto, ProductoWithMarca } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation, defaultFormOptions } from "./create/form";
import type { OutputSchema } from "./create/form-schema";
import { ProductoTipoField } from "../tipos/form-fields";
import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { useStore } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";

export interface ProductoFieldProps extends Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
> {
    tipo: ProductoTipoField;
}

export type ProductoModeloField = CreatableComboboxField;
export function ProductoModeloField({
    label = "Modelo de Producto",
    tipo,
    disabled,
    ...props
}: ProductoFieldProps) {
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

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = <R extends TResponse<Producto>, P extends OutputSchema>() => useCreateFormMutation<R, P>({
        onSuccess: (_, __, ___, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['productos'] });
        }
    });

    const dialogForm = useForm(() => defaultFormOptions(useDialogFormMutation));
    dialogForm.setFieldValue('tipo_id', tipo);

    return (
        <>
            <CreatableComboboxField
                options={options}
                label={label}
                onCreateRequest={(searchValue) => {
                    dialogForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                }}
                disabled={disabled}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Modelo de Producto</DialogTitle>
                    </DialogHeader>

                    <AppForm form={dialogForm} className="contents" showTipoField={false}>
                        <DialogFooter>
                            <dialogForm.SubmitButton />

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
    modelo_id: ProductoModeloField;
};

const productoGroupDefaultValues: ProductoGroupField = {
    modelo_id: undefined,
    tipo_id: undefined,
};

export const ProductoGroupField = withFieldGroup({
    defaultValues: productoGroupDefaultValues,
    props: {} as React.ComponentProps<typeof FieldGroup>,
    render: ({ group, ...props }) => {
        const productoTipo = useStore(group.store, (state) => state.values.tipo_id);

        return (
            <FieldGroup {...props}>
                <group.AppField
                    name="tipo_id"
                    children={() => <ProductoTipoField />}
                    listeners={{
                        onChange: () => group.setFieldValue('modelo_id', undefined)
                    }}
                />

                <group.AppField
                    name="modelo_id"
                    children={() =>
                        <ProductoModeloField tipo={productoTipo} disabled={productoTipo === undefined} />
                    }
                />
            </FieldGroup>
        );
    }
});
