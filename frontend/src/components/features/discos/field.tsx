import type { Disco, DiscoTipo } from "@/types/articulos/discos";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";
import type { BooleanMap, TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";
import { discoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { CreatableComboboxFieldGrouped } from "@/components/ui/creatable-combobox-field-grouped";
import { useFieldContext } from "@/components/ui/form-context";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppForm, withFieldGroup } from "@/components/ui/form.shared";
import { DiscoTipoField, type DiscoTipoFieldType } from "./tipo-field";
import { DiscoCapacidadField, type DiscoCapacidadFieldType } from "./capacidad-field";
import { DiscoInterfazField, type DiscoInterfazFieldType } from "./interfaz-field";
import { DiscoFactorFormaField, type DiscoFactorFormaFieldType } from "./factor-forma-field";
import { selectedNumberOption } from "@/lib/schemas/common";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { productoVarianteSpecDefaultFormValues, ProductoVarianteSpecFieldGroup, productoVarianteSpecFormValidator, type ProductoVarianteSpecSchema } from "../productos/variante-spec-field-group";
import { FormLayout } from "@/components/ui/form-layout";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import React from "react";
import z from "zod";

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
>;

const FieldsGroup = withFieldGroup({
    defaultValues: discoDefaultValues,
    props: {} as React.ComponentProps<typeof FieldGroup> & {
        required?: Partial<BooleanMap<DiscoFields>>
    },
    render: ({ group, className, required, ...props }) => (
        <FieldGroup
            className={cn(
                "grid grid-cols-2",
                className
            )}
            {...props}
        >
            <group.AppField
                name="tipo_id"
                children={() => <DiscoTipoField required={required?.tipo_id} />}
            />

            <group.AppField
                name="capacidad_id"
                children={() => <DiscoCapacidadField required={required?.capacidad_id} />}
            />

            <group.AppField
                name="factor_forma_id"
                children={() => <DiscoFactorFormaField required={required?.factor_forma_id} />}
            />

            <group.AppField
                name="interfaz_id"
                children={() => <DiscoInterfazField required={required?.interfaz_id} />}
            />
        </FieldGroup>
    )
});

function Field<Multiple extends boolean | undefined = false>({
    layout,
    ...props
}: FieldProps<Multiple>) {
    const field = useFieldContext<FieldType>();
    const { queryKey } = discoQueryOptions;

    const { mutate } = useFormMutation<TResponse<Disco>, z.output<typeof validator>>({
        url: 'api/discos',
        onSuccess: (data, _, __, { client }) => {
            const disco = data.data.data;
            client.setQueryData(queryKey, (prev = []) => [...prev, disco]);
            field.handleChange(disco.id);
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
            onSubmit: validator,
        },
        defaultValues,
        onSubmit: ({ formApi, value }) => {
            const data = validator.parse(value);
            mutate({ formApi, data });
        },
    });

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <CreatableComboboxFieldGrouped
                items={items}
                onCreate={(query) => {
                    form.setFieldValue('producto.modelo', query);
                    setIsOpen(true);
                }}
                layout={{
                    label: 'Características',
                    ...layout
                }}
                {...props}
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="min-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Registrar Disco de Almacenamiento</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo disco de almacenamiento
                        </DialogDescription>
                    </DialogHeader>

                    <FormLayout form={form} className="contents">
                        <ProductoVarianteSpecFieldGroup
                            form={form}
                            fields={{
                                marca_id: 'producto.marca_id',
                                modelo: 'producto.modelo'
                            }}
                            required={{
                                marca_id: true,
                                modelo: true
                            }}
                        />

                        <FieldsGroup
                            form={form}
                            fields={{
                                capacidad_id: "disco.capacidad_id",
                                factor_forma_id: "disco.factor_forma_id",
                                interfaz_id: "disco.factor_forma_id",
                                tipo_id: "disco.tipo_id"
                            }}
                            required={{
                                tipo_id: true,
                                capacidad_id: true
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
    type FieldType as DiscoFieldType,
    type Schema as DiscoFormSchema,
    validator as discoFormValidator,
    defaultValues as discoDefaultFormValues,
    FieldsGroup as DiscoFieldsGroup,
}
