import type { TResponse } from "@/types/generics";
import type { RamCapacidad } from "@/types/articulos/rams";
import { useComboboxFieldContext, type ComboboxFieldEmptyType, type ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ramCapacidadQueryOptions } from "./queries";
import { CreatableComboboxFieldSimple, type CreatableComboboxFieldSimpleProps } from "@/components/ui/creatable-combobox-field-simple";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useAppForm } from '@/components/ui/form.shared';
import { requiredString } from "@/lib/schemas/common";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import React from "react";
import z from "zod";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";

type Schema = { nombre: InputFieldType; }
const defaultValues: Schema = { nombre: undefined }
const validator = z.object({ nombre: requiredString });
type OutputSchema = z.output<typeof validator>;

type ComboboxItem = InferComboboxItemFromFn<typeof toComboboxCatalogItems>;
type FieldValue = ComboboxItem['value'];
type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple, FieldValue>

type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    CreatableComboboxFieldSimpleProps<
        Empty,
        Multiple,
        ComboboxItem
    >,
    'items' | 'onCreate'
>

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
    const { queryKey } = ramCapacidadQueryOptions;
    const { data: items = [] } = useQuery({
        ...ramCapacidadQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useComboboxFieldContext<Empty, Multiple, FieldValue>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { mutate, isPending } = useFormMutation<TResponse<RamCapacidad>, OutputSchema>({
        url: 'api/ram_capacidades',
        onSuccess: (data, _, __, { client }) => {
            const capacidad = data.data.data;
            client.setQueryData(queryKey, (prev: RamCapacidad[] = []) => [...prev, capacidad]);
            field.handleChange((props.multiple
                ? (prev = []) => [...prev, capacidad.id]
                : capacidad.id
            ) as FieldType<Empty, Multiple>);
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
                layout={{ label: "Capacidad", ...layout }}
                {...props}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.setFieldValue('nombre', undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar capacidad de RAM</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nueva capacidad de RAM
                        </DialogDescription>
                    </DialogHeader>

                    <form.AppForm>
                        <form.AppField
                            name="nombre"
                            children={() => (
                                <InputField
                                    fieldLayout={{ label: "Capacidad" }}
                                    placeholder="4 GB, 8 GB, 12 GB..."
                                />
                            )}
                        />

                        <DialogFooter>
                            <SubmitButton isSubmitting={isPending} />

                            <Button onClick={() => setDialogOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </form.AppForm>
                </DialogContent>
            </Dialog>
        </>
    );
}

export {
    Field as RamCapacidadField,
    type FieldType as RamCapacidadFieldType
}
