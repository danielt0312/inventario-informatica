import type { TResponse } from "@/types/generics";
import type { Proveedor } from "@/types/orden_compras";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { CreatableComboboxFieldSimple, type CreatableComboboxFieldSimpleProps } from "@/components/ui/creatable-combobox-field-simple";
import { useComboboxFieldContext, type ComboboxFieldEmptyType, type ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { requiredString } from "@/lib/schemas/common";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { FormLayout } from "@/components/ui/form-layout";
import { SubmitButton } from "@/components/ui/submit-button";
import { useAppForm } from "@/components/ui/form.shared";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { proveedorQueryOptions } from "./queries";
import { toComboboxItems, type ComboboxLayoutMultiple, type InferComboboxItemFromFn, type InferComboboxItemValueFromFn } from "@/components/ui/combobox-layout.shared";
import React from "react";
import z from "zod";

type Schema = {
    nombre: InputFieldType;
    rfc: InputFieldType;
}

const defaultValues: Schema = {
    nombre: undefined,
    rfc: undefined,
}

const validator = z.object({
    nombre: requiredString,
    rfc: requiredString.refine(
        v => !(v.length < 12 || v.length > 13),
        {
            error: 'El RFC debe de tener entre 12 y 13 caracteres',
            when: ({ value }) => requiredString
                .safeParse(value)
                .success
        }
    )
});

const dataToComboboxItems = (data: Proveedor[]) =>
    toComboboxItems(data, (proveedor) => ({
        label: `${proveedor.nombre} ${proveedor.rfc}`,
        value: proveedor.id,
        nombre: proveedor.nombre,
        rfc: proveedor.rfc
    }));

type ComboboxItem = InferComboboxItemFromFn<typeof dataToComboboxItems>;
type ComboboxItemValue = InferComboboxItemValueFromFn<typeof dataToComboboxItems>;

type FieldProps<Empty extends ComboboxFieldEmptyType, Multiple extends ComboboxLayoutMultiple> = Omit<
    CreatableComboboxFieldSimpleProps<
        Empty,
        Multiple,
        ComboboxItem
    >,
    'items' | 'onCreate'
>;

type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple, ComboboxItemValue>;
function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
    const field = useComboboxFieldContext<Empty, Multiple, ComboboxItemValue>();

    const { queryKey } = proveedorQueryOptions;

    const { data: items = [] } = useQuery({
        ...proveedorQueryOptions,
        select: dataToComboboxItems
    });

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { mutate, isPending } = useFormMutation<TResponse<Proveedor>>({
        url: 'api/proveedores',
        onSuccess: (data, _, __, { client }) => {
            const proveedor = data.data.data;
            client.setQueryData(queryKey, (prev: Proveedor[] = []) => [...prev, proveedor])
            field.handleChange((props.multiple
                ? (prev: ComboboxItemValue[] = []) => [...prev, proveedor.id]
                : proveedor.id
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
                layout={{
                    label: "Proveedor",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    form.setFieldValue('nombre', searchValue);
                    setDialogOpen(true);
                }}
                renderItem={(item) => (
                    <>
                        {item.nombre}<span className="text-muted-foreground">— {item.rfc}</span>
                    </>
                )}
                renderSelectedItem={(item) => (
                    <>
                        {item.nombre}<span className="text-muted-foreground"> — {item.rfc}</span>
                    </>
                )}
                renderSelectedItems={(items) => items.map((i) => i.nombre).join(", ")}
                {...props}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.reset()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Proveedor</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo proveedor
                        </DialogDescription>
                    </DialogHeader>

                    <FormLayout form={form}>
                        <form.AppForm>
                            <form.AppField
                                name="nombre"
                                children={() => (
                                    <InputField
                                        placeholder="Ingresa el nombre del proveedor"
                                        fieldLayout={{ label: "Nombre" }}
                                        required
                                    />
                                )}
                            />

                            <form.AppField
                                name="rfc"
                                children={() => (
                                    <InputField
                                        fieldLayout={{ label: "RFC (con homoclave)" }}
                                        placeholder="Ingresa el RFC con homoclave del proveedor"
                                        required
                                    />
                                )}
                            />
                        </form.AppForm>

                        <DialogFooter>
                            <SubmitButton isSubmitting={isPending} label="Registrar" spinnerLabel="Registrando..." />

                            <Button onClick={() => setDialogOpen(false)} variant="outline">
                                <XCircleIcon /> Cancelar
                            </Button>
                        </DialogFooter>
                    </FormLayout>
                </DialogContent>
            </Dialog>
        </>
    );
}

export {
    Field as ProveedorField,
    type FieldType as ProveedorFieldType
}
