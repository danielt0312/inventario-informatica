import type { ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import type { TResponse } from "@/types/generics";
import type { ProductoMarca } from "@/types/productos";
import { defaultFieldValueFromItem, useComboboxFieldContext, type ComboboxFieldEmptyType, type ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { CreatableComboboxFieldSimple, type CreatableComboboxFieldSimpleProps } from "@/components/ui/creatable-combobox-field-simple";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppForm } from "@/components/ui/form.shared";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { requiredString } from "@/lib/schemas/common";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormLayout } from "@/components/ui/form-layout";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { formMutationOptions } from "@/hooks/use-form-mutation";
import { productoMarcaQueryOptions } from "./queries";
import React from "react";
import z from "zod";

type ComboboxItem = InferComboboxItemFromFn<typeof toComboboxCatalogItems>;
type ComboboxItemValue = ComboboxItem['value'];
type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple, ComboboxItemValue>

type Schema = { nombre: InputFieldType; }
const defaultValues: Schema = { nombre: undefined }
const validator = z.object({ nombre: requiredString });


type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    CreatableComboboxFieldSimpleProps<
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems<ProductoMarca>>
    >,
    'items' | 'onCreate'
>

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
    const {
        onFieldValueChange = defaultFieldValueFromItem(props.emptyValue),
    } = props

    const { queryKey } = productoMarcaQueryOptions;

    const { data: items = [] } = useQuery({
        ...productoMarcaQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useComboboxFieldContext<Empty, Multiple, number>();

    const [open, setOpen] = React.useState(false);

    const { mutateAsync } = useMutation(formMutationOptions<TResponse<ProductoMarca>>({
        url: "api/producto_marcas",
        onSuccess: async (data, _, __, { client }) => {
            const marca = data.data.data;
            field.handleChange(onFieldValueChange(marca as never) as never);
            client.setQueryData(queryKey, (prev = []) => [...prev, marca]);
            await client.invalidateQueries({ queryKey });
            setOpen(false);
        }
    }));

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ formApi, value }) => {
            const data = validator.parse(value);
            await mutateAsync({ formApi, data });
        }
    });

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
                    field.handleChange(props.emptyValue as Empty);
                    setOpen(true);
                }}
                {...props}
            />

            <Dialog open={open} onOpenChange={setOpen}>
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

                            <Button onClick={() => setOpen(false)} variant="outline">
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
    type FieldType as ProductoMarcaFieldType,
}
