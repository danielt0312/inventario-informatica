import type { TResponse } from "@/types/generics";
import type { RamTipo } from "@/types/articulos/rams";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ramTipoQueryOptions } from "./queries";
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
                label: "Tipo",
                ...fieldLayout
            }}
            placeholder="DDR, DDR2, DDR3..."
            {...props}
        />
    );
}

type TipoFieldType = ComboboxFieldType<false, undefined>;
function TipoField({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldSimple>, 'items' | 'onCreate'>) {
    const { queryKey } = ramTipoQueryOptions;
    const { data: items = [] } = useQuery({
        ...ramTipoQueryOptions,
        select: toComboboxCatalogItems
    });

    const field = useFieldContext<TipoFieldType>();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { mutate } = useFormMutation<TResponse<RamTipo>, OutputSchema>({
        url: 'api/ram_tipos',
        onSuccess: (data, _, __, { client }) => {
            const tipo = data.data.data;
            client.setQueryData(queryKey, (prev: RamTipo[] = []) => [...prev, tipo]);
            field.handleChange(tipo.id);
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
                    label: "Tipo",
                    ...layout
                }}
                {...props}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.setFieldValue('nombre', undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar tipo de RAM</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo tipo de RAM
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
    TipoField as RamTipoField,
    type TipoFieldType as RamTipoFieldType,
}
