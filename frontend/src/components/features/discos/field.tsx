import type { Disco, DiscoTipo } from "@/types/articulos/discos";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";
import { useQuery } from "@tanstack/react-query";
import { discoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { CreatableComboboxFieldGrouped } from "@/components/ui/creatable-combobox-field-grouped";
import { useFieldContext } from "@/components/ui/form-context";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/form.shared";
import z from "zod";
import type { DiscoTipoFieldType } from "./tipo-field";
import type { DiscoCapacidadFieldType } from "./capacidad-field";
import type { DiscoInterfazFieldType } from "./interfaz-field";
import type { DiscoFactorFormaFieldType } from "./factor-forma-field";
import { selectedNumberOption } from "@/lib/schemas/common";
import { useFormMutation } from "@/hooks/use-form-mutation";
import type { TResponse } from "@/types/generics";
import { productoVarianteSpecDefaultFormValues, ProductoVarianteSpecFieldGroup, productoVarianteSpecFormValidator, type ProductoVarianteSpecSchema } from "../productos/spec-form";
import React from "react";
import { FormLayout } from "@/components/ui/form-layout";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

const dataToComboboxItems = (data: Disco[]) => {
    const variantesPorDiscoTipo = new Map<number, typeof data>();
    const discoTipo: DiscoTipo[] = [];

    for (const variante of data) {
        const tipoId = variante.disco.tipo.id;
        let variantes = variantesPorDiscoTipo.get(tipoId);

        if (!variantes) {
            variantes = [];
            variantesPorDiscoTipo.set(tipoId, variantes);
            discoTipo.push(variante.disco.tipo);
        }

        variantes.push(variante);
    }

    return toComboboxGroups(discoTipo, (tipo) => ({
        label: tipo.nombre,
        items: toComboboxItems(
            variantesPorDiscoTipo.get(tipo.id) ?? [],
            (producto) => ({
                value: producto.id,
                label: producto.descripcion
            })
        )
    }));
}

type DiscoFields = {
    tipo_id: DiscoTipoFieldType,
    capacidad_id: DiscoCapacidadFieldType,
    interfaz_id: DiscoInterfazFieldType,
    factor_forma_id: DiscoFactorFormaFieldType,

}

const discoDefaultValues: DiscoFields = {
    tipo_id: undefined,
    capacidad_id: undefined,
    interfaz_id: null,
    factor_forma_id: null
}

type Schema = {
    disco: DiscoFields;
    producto: ProductoVarianteSpecSchema;
}

const defaultValues: Schema = {
    disco: discoDefaultValues,
    producto: productoVarianteSpecDefaultFormValues,
}

const discoValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    interfaz_id: selectedNumberOption.nullable(),
    factor_forma_id: selectedNumberOption.nullable(),
});

const validator = z.object({
    disco: discoValidator,
    producto: productoVarianteSpecFormValidator
});

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldGroupedProps<
        InferComboboxGroupItemFromFn<typeof dataToComboboxItems>,
        InferComboboxGroupFromFn<typeof dataToComboboxItems>,
        Multiple
    >,
    'items' | 'onCreate'
>

function Field<Multiple extends boolean | undefined = false>({
    layout,
    ...props
}: FieldProps<Multiple>) {
    const field = useFieldContext<FieldType>();

    const { queryKey } = discoQueryOptions;

    const { mutate } = useFormMutation<TResponse<Disco>, z.output<typeof validator>>({
        url: 'api/discos',
        onSuccess: (data, _, __, { client }) => {
            const newData = data.data.data;
            client.setQueryData(queryKey, (prev = []) => [
                ...prev,
                newData
            ]);
            field.handleChange(newData.id);
            client.invalidateQueries({ queryKey });
            setIsOpen(false);
        }
    });

    const { data: items = [] } = useQuery({
        ...discoQueryOptions,
        select: dataToComboboxItems
    });

    const form = useAppForm({
        validators: {
            onSubmit: validator
        },
        defaultValues: defaultValues,
        onSubmit: ({ formApi, value }) => {
            const data = validator.parse(value);

        }
    });

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <CreatableComboboxFieldGrouped
                items={items}
                onCreate={(query) => {

                }}
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Modelo de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo modelo de producto
                        </DialogDescription>
                    </DialogHeader>

                    <FormLayout form={form} className="contents">
                        <ProductoVarianteSpecFieldGroup
                            form={form}
                            fields={{
                                marca_id: 'disco.capacidad_id',
                                modelo: 'producto.modelo'
                            }}
                        />

                        <DialogFooter>
                            <form.SubmitFormButton />

                            <Button onClick={() => setIsOpen(false)} variant="outline">
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
    Field as DiscoField,
    type FieldType as DiscoFieldType
}
