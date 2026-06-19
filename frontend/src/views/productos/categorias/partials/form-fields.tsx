import { CreatableComboboxField } from "@/components/composed/@tanstack/form-fields";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { ProductoCategoria } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useFormMutation } from "../create/form";
import { withFieldGroup } from "@/components/composed/@tanstack/form";
import { defaultValues } from "./form-schema";
import { FieldGroup as FieldGroupComponent } from "@/components/ui/field";

export type FieldProps = Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
>;

export function Field({
    label = "Categoría de Producto",
    ...props
}: FieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ProductoCategoria[]>>('api/producto_categorias')
            .then(r => r.data.data),
        select: toOptions
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useFormMutation({
        onSuccess: () => setDialogIsOpen(false)
    });

    const dialogForm = useForm({
        useMutationHook: useDialogFormMutation
    });

    return (
        <>
            <CreatableComboboxField
                options={options}
                label={label}
                onCreateRequest={(searchValue) => {
                    dialogForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear nueva categoria</DialogTitle>
                    </DialogHeader>

                    <AppForm form={dialogForm}>
                        <DialogFooter>
                            <dialogForm.SubmitButton />

                            <Button onClick={() => setDialogIsOpen(false)}>
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </AppForm>
                </DialogContent>
            </Dialog>
        </>
    );
}

const props: React.ComponentProps<typeof FieldGroupComponent> = {};
export const FieldGroup = withFieldGroup({
    defaultValues,
    props,
    render: ({ group, ...props }) => (
        <FieldGroupComponent {...props}>
            <group.AppField
                name="id"
                children={() => <Field />}
            />
        </FieldGroupComponent>
    )
})
