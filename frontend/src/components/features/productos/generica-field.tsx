import type { ProductoTipo, ProductoVarianteGenerica } from "@/types/productos";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { type ProductoTipoFieldType } from "./tipos/form-fields";
import type { TResponse } from "@/types/generics";
import type { ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { useFieldContext } from "@/components/ui/form-context";
import { CreatableComboboxFieldGrouped } from "@/components/ui/creatable-combobox-field-grouped";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { FormLayout } from "@/components/ui/form-layout";
import { productoQueryOptions } from "./queries";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { selectedNumberOption } from "@/lib/schemas/common";
import { useAppForm } from "@/components/ui/form.shared";
import { productoVarianteSpecDefaultFormValues, ProductoVarianteSpecFieldGroup, productoVarianteSpecFormValidator, type ProductoVarianteSpecSchema } from "./spec-form";
import React from "react";
import z from "zod";

const dataToComboboxItems = (data: ProductoVarianteGenerica[]) => {
    const productosPorTipo = new Map<number, typeof data>();
    const tiposDisponibles: ProductoTipo[] = [];

    for (const generica of data) {
        const tipoId = generica.producto.tipo.id;
        let productos = productosPorTipo.get(tipoId);

        if (!productos) {
            productos = [];
            productosPorTipo.set(tipoId, []);
            tiposDisponibles.push(generica.producto.tipo);
        }

        productos.push(generica);
    }

    return toComboboxGroups(tiposDisponibles, (tipo) => ({
        label: tipo.nombre,
        items: toComboboxItems(
            productosPorTipo.get(tipo.id) ?? [],
            (producto) => ({
                value: producto.id,
                label: producto.descripcion
            })
        )
    }));
}

type Schema = ProductoVarianteSpecSchema & {
    tipo_id: ProductoTipoFieldType;
}

const defaultValues: Schema = {
    tipo_id: undefined,
    ...productoVarianteSpecDefaultFormValues
}

const validator = productoVarianteSpecFormValidator.extend({
    tipo_id: selectedNumberOption,
});

export type OutputSchema = z.output<typeof validator>;

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldGroupedProps<
        InferComboboxGroupItemFromFn<typeof dataToComboboxItems>,
        InferComboboxGroupFromFn<typeof dataToComboboxItems>,
        Multiple
    >,
    'items' | 'onCreate'
> & {
    tipoId: ProductoTipoFieldType;
}

function Field<Multiple extends boolean | undefined = false>({
    layout,
    tipoId,
    disabled,
    ...props
}: FieldProps<Multiple>) {
    const field = useFieldContext<FieldType>();

    const queryOptions = productoQueryOptions(tipoId);
    const { queryKey } = queryOptions;

    const { data: items = [] } = useQuery({
        ...queryOptions,
        enabled: !disabled,
        select: dataToComboboxItems
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const { mutate } = useFormMutation<TResponse<ProductoVarianteGenerica>, OutputSchema>({
        url: `api/productos`,
        onSuccess: (data, _, __, { client }) => {
            const newData = data.data.data;
            client.setQueryData(queryKey, (prev = []) => [
                ...prev,
                newData
            ]);
            field.handleChange(newData.id);
            client.invalidateQueries({ queryKey });
            setDialogIsOpen(false);
        }
    });

    const form = useAppForm({
        validators: {
            onSubmit: validator
        },
        defaultValues: {
            ...defaultValues,
            tipo_id: tipoId
        },
        onSubmit: ({ formApi, value }) => {
            const data = validator.parse(value);
            mutate({ formApi, data });
        }
    });

    return (
        <>
            <CreatableComboboxFieldGrouped
                items={items}
                layout={{
                    label: "Producto",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    form.setFieldValue('modelo', searchValue);
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

                    <FormLayout form={form}>
                        <ProductoVarianteSpecFieldGroup
                            form={form}
                            fields={{
                                marca_id: 'marca_id',
                                modelo: 'modelo'
                            }}
                        />

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
    Field as ProductoVarianteGenericaField
}
