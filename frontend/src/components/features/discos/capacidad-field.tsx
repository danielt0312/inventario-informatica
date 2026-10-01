import type { TResponse } from "@/types/generics";
import type { DiscoCapacidad } from "@/types/articulos/discos";
import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ComboboxLayoutItemValue, ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { discoCapacidadQueryOptions } from "./queries";
import { CreatableComboboxFieldSimple, type CreatableComboboxFieldSimpleProps } from "@/components/ui/creatable-combobox-field-simple";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useFieldContext } from "@/components/ui/form-context";
import { useAppForm } from '@/components/ui/form.shared';
import { requiredString } from "@/lib/schemas/common";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormLayout } from "@/components/ui/form-layout";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import React from "react";
import z from "zod";

type Schema = { nombre: InputFieldType; }
const defaultValues: Schema = { nombre: undefined }
const validator = z.object({ nombre: requiredString });
type OutputSchema = z.output<typeof validator>;

type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false, Value extends ComboboxLayoutItemValue = number> = ComboboxFieldType<Empty, Multiple, Value>;

type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    CreatableComboboxFieldSimpleProps<
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems<DiscoCapacidad>>
    >,
    'items' | 'onCreate'
>

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
    const { queryKey } = discoCapacidadQueryOptions;
    const { data: items = [] } = useQuery({
        ...discoCapacidadQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useFieldContext<FieldType>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { mutate } = useFormMutation<TResponse<DiscoCapacidad>, OutputSchema>({
        url: 'api/disco_capacidades',
        onSuccess: (data, _, __, { client }) => {
            const capacidad = data.data.data;
            client.setQueryData(queryKey, (old: DiscoCapacidad[] = []) => [...old, capacidad]);
            field.handleChange(capacidad.id);
            client.invalidateQueries({ queryKey });
            setDialogOpen(false);
        }
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });

    return (
        <>
            <CreatableComboboxFieldSimple
                items={items}
                onCreate={(query) => {
                    form.setFieldValue('nombre', query);
                    setDialogOpen(true);
                }}
                layout={{
                    label: "Capacidad",
                    ...layout
                }}
                {...props}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.setFieldValue('nombre', undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Capacidad de Disco</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nueva capacidad de disco
                        </DialogDescription>
                    </DialogHeader>

                    <FormLayout form={form} className="contents">
                        <form.AppField
                            name="nombre"
                            children={() => (
                                <InputField
                                    fieldLayout={{
                                        label: "Capacidad",
                                    }}
                                    placeholder="Ingresa la capacidad del disco"
                                />
                            )}
                        />

                        <DialogFooter>
                            <form.SubmitFormButton />

                            <Button onClick={() => setDialogOpen(false)} variant="outline">
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
    Field as DiscoCapacidadField,
    type FieldType as DiscoCapacidadFieldType
}
