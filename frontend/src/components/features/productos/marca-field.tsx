import type { ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import type { TResponse } from "@/types/generics";
import type { ProductoMarca } from "@/types/productos";
import { useFieldContext } from "@/components/ui/form-context";
import { toComboboxCatalogItems } from "@/lib/utils";
import { productoMarcaQueryOptions } from "./queries";
import { useQuery } from "@tanstack/react-query";
import { useAppForm } from "@/components/ui/form.shared";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { requiredString } from "@/lib/schemas/common";
import { CreatableComboboxFieldSimple } from "@/components/ui/creatable-combobox-field-simple";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormLayout } from "@/components/ui/form-layout";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { useFormMutation } from "@/hooks/use-form-mutation";
import React from "react";
import z from "zod";

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldSimpleProps<
        InferComboboxItemFromFn<typeof toComboboxCatalogItems>,
        Multiple
    >,
    'items' | 'onCreate'
>;

type Schema = {
    nombre: InputFieldType;
}

const defaultValues: Schema = {
    nombre: undefined
}

const validator = z.object({
    nombre: requiredString
});

function Field<Multiple extends boolean | undefined = false>({
    layout,
    ...props
}: FieldProps<Multiple>) {
    const field = useFieldContext<FieldType>();

    const { queryKey } = productoMarcaQueryOptions;

    const { data: items = [] } = useQuery({
        ...productoMarcaQueryOptions,
        select: toComboboxCatalogItems
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const { mutateAsync } =  useFormMutation<TResponse<ProductoMarca>>({
        url: 'api/producto_categorias',
        onSuccess: (data, _, __, { client }) => {
            const newData = data.data.data;
            client.setQueryData(queryKey, (prev = []) => [...prev, newData]);
            field.handleChange(newData.id);
            setDialogIsOpen(false);
            client.invalidateQueries({ queryKey: ['producto_marcas'] });
        }
    });

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ formApi, value }) => {
            const data = validator.parse(value);
            await mutateAsync({ formApi, data });
        }
    })

    return (
        <>
            <CreatableComboboxFieldSimple
                items={items}
                layout={{
                    label: "Marca del Producto",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    form.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Marca de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registrar nueva marca de producto
                        </DialogDescription>
                    </DialogHeader>

                    <FormLayout form={form}>
                        <form.AppForm>
                            <form.AppField
                                name="nombre"
                                children={() => (
                                    <InputField
                                        fieldLayout={{
                                            label: "Marca del Producto",
                                        }}
                                        placeholder="Ingresa el nombre de la marca del producto"
                                    />
                                )}
                            />
                        </form.AppForm>

                        <DialogFooter>
                            <form.SubmitFormButton />

                            <Button onClick={() => setDialogIsOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </FormLayout>
                </DialogContent>
            </Dialog>
        </>
    );
}

export {
    Field as ProductoMarcaField,
    type FieldType as ProductoMarcaFieldType
}
