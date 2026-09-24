import type { TResponse } from "@/types/generics";
import type { DiscoInterfaz } from "@/types/articulos/discos";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { discoInterfazQueryOptions } from "./queries";
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
                label: "Interfaz",
                ...fieldLayout
            }}
            placeholder="Ingresa la interfaz del disco"
            {...props}
        />
    );
}

type InterfazFieldType = ComboboxFieldType<false, null>;
function InterfazField({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldSimple>, 'items' | 'onCreate'>) {
    const { queryKey } = discoInterfazQueryOptions;
    const { data: items = [] } = useQuery({
        ...discoInterfazQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useFieldContext<InterfazFieldType>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { mutate } = useFormMutation<TResponse<DiscoInterfaz>, OutputSchema>({
        url: 'api/disco_interfaces',
        onSuccess: (data, _, __, { client }) => {
            const interfaz = data.data.data;
            client.setQueryData(queryKey, (old: DiscoInterfaz[] = []) => [...old, interfaz]);
            field.handleChange(interfaz.id);
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
                    label: "Interfaz",
                    ...layout
                }}
                {...props}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.setFieldValue('nombre', undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Interfaz de Disco</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nueva interfaz de disco
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
    InterfazField as DiscoInterfazField,
    type InterfazFieldType as DiscoInterfazFieldType,
}
