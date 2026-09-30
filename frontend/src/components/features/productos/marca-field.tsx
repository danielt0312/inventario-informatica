import type { ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import type { TResponse } from "@/types/generics";
import type { ProductoMarca } from "@/types/productos";
import { defaultFieldValueFromItem, useComboboxFieldContext, type ComboboxFieldEmptyType, type ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { CreatableComboboxFieldSimpleBase, type CreatableComboboxFieldSimpleBaseProps } from "@/components/ui/creatable-combobox-field-simple";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppForm } from "@/components/ui/form.shared";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { requiredString } from "@/lib/schemas/common";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormLayout } from "@/components/ui/form-layout";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { formMutationOptions, type FormMutationOptions } from "@/hooks/use-form-mutation";
import { productoMarcaQueryOptions } from "./queries";
import React from "react";
import z from "zod";

type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple>;

type Schema = { nombre: InputFieldType; }
const defaultValues: Schema = { nombre: undefined }
const validator = z.object({ nombre: requiredString });


type MutationOptions = FormMutationOptions<
    TResponse<ProductoMarca>,
    z.output<typeof validator>
>

const mutationOptions = (
    options?: Omit<MutationOptions, 'url'>
) => formMutationOptions({
    url: "api/producto_marcas",
    ...options
});

type FieldProps<Empty extends ComboboxFieldEmptyType, Multiple extends ComboboxLayoutMultiple> = Omit<
    CreatableComboboxFieldSimpleBaseProps<
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems<ProductoMarca>>
    >,
    'items' | 'onCreate'
> & {
    formMutationOptions?: ReturnType<typeof mutationOptions>;
}

function Field<Empty extends ComboboxFieldEmptyType, Multiple extends ComboboxLayoutMultiple>({
    layout,
    emptyValue,
    formMutationOptions: mutationOverrides,
    ...props
}: FieldProps<Empty, Multiple>) {
    const field = useComboboxFieldContext<Empty, Multiple>();

    const {
        onFieldValueChange = defaultFieldValueFromItem(emptyValue),
    } = props

    const { queryKey } = productoMarcaQueryOptions;

    const { data: items = [] } = useQuery({
        ...productoMarcaQueryOptions,
        select: toComboboxCatalogItems
    });

    const [open, setOpen] = React.useState(false);

    const { mutateAsync } = useMutation(mutationOptions({
        ...mutationOverrides,
        onSuccess: async (data, variables, onMutateResult, context) => {
            const marca = data.data.data;
            const { client } = context;
            field.handleChange(onFieldValueChange(marca as never) as never);
            client.setQueryData(queryKey, (prev = []) => [...prev, marca]);
            await client.invalidateQueries({ queryKey });
            await mutationOverrides?.onSuccess?.(data, variables, onMutateResult, context);
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
            <CreatableComboboxFieldSimpleBase
                items={items}
                layout={{
                    label: "Marca del Producto",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    form.setFieldValue('nombre', searchValue);
                    field.handleChange(emptyValue as never);
                    setOpen(true);
                }}
                emptyValue={emptyValue}
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
    mutationOptions as productoMarcaFormMutationOptions,
    Field as BaseField
}
