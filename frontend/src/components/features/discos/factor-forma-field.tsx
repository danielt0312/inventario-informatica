import type { TResponse } from "@/types/generics";
import type { DiscoCapacidad, DiscoFactorForma } from "@/types/articulos/discos";
import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { discoFactorFormaQueryOptions } from "./queries";
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
import type { ComboboxLayoutItemValue, ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";

type Schema = { nombre: InputFieldType; }

const defaultValues: Schema = { nombre: undefined }

const validator = z.object({ nombre: requiredString });
type OutputSchema = z.output<typeof validator>;

type FieldType<Empty extends ComboboxFieldEmptyType = null, Multiple extends ComboboxLayoutMultiple = false, Value extends ComboboxLayoutItemValue = number> = ComboboxFieldType<Empty, Multiple, Value>;

type FieldProps<Empty extends ComboboxFieldEmptyType = null, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    CreatableComboboxFieldSimpleProps<
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems<DiscoCapacidad>>
    >,
    'items' | 'onCreate'
>

function Field<Empty extends ComboboxFieldEmptyType = null, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
    const { queryKey } = discoFactorFormaQueryOptions;
    const { data: items = [] } = useQuery({
        ...discoFactorFormaQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useFieldContext<FieldType>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { mutate } = useFormMutation<TResponse<DiscoFactorForma>, OutputSchema>({
        url: 'api/disco_factor_formas',
        onSuccess: (data, _, __, { client }) => {
            const capacidad = data.data.data;
            client.setQueryData(queryKey, (old: DiscoFactorForma[] = []) => [...old, capacidad]);
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
                    label: "Factor de Forma",
                    ...layout
                }}
                {...props}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.setFieldValue('nombre', undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Factor de Forma de Disco</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo factor de forma de disco
                        </DialogDescription>
                    </DialogHeader>

                    <FormLayout form={form} className="contents">
                        <form.AppField
                            name="nombre"
                            children={() => (
                                <InputField
                                    fieldLayout={{
                                        label: "Factor de Forma",
                                    }}
                                    placeholder='M.2, 2.5", ...'
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
    Field as DiscoFactorFormaField,
    type FieldType as DiscoFactorFormaFieldType
}
