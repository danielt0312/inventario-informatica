import type { TResponse } from "@/types/generics";
import type { DiscoCapacidad } from "@/types/articulos/discos";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { discoCapacidadQueryOptions } from "./queries";
import { CreatableComboboxFieldSimple } from "@/components/ui/creatable-combobox-field-simple";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useAppForm, useFieldContext } from "@/components/ui/form-context";
import { requiredString } from "@/lib/schemas/common";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import React from "react";
import z from "zod";

type Schema = {
    nombre: NombreFieldType;
}

const defaultValues: Schema = {
    nombre: undefined,
}

const validator = z.object({ nombre: requiredString });
type OutputSchema = z.output<typeof validator>;

type NombreFieldType = InputFieldType
function NombreField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            fieldLayout={{
                label: "Capacidad",
                ...fieldLayout
            }}
            placeholder="Ingresa la capacidad del disco"
            {...props}
        />
    );
}

type CapacidadFieldType = ComboboxFieldType<false, undefined>;
function CapacidadField({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldSimple>, 'items' | 'onCreate'>) {
    const { queryKey } = discoCapacidadQueryOptions;
    const { data: items = [] } = useQuery({
        ...discoCapacidadQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useFieldContext<CapacidadFieldType>();
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

                    <Form form={form} className="contents">
                        <form.AppField name="nombre" children={() => <NombreField />} />

                        <DialogFooter>
                            <form.SubmitFormButton />

                            <Button onClick={() => setDialogOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export {
    CapacidadField as DiscoCapacidadField,
    type CapacidadFieldType as DiscoCapacidadFieldType
}
