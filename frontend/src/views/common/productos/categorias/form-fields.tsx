import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { ProductoCategoria } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import { SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";

export type ProductoCategoriaField = CreatableComboboxField;
export function ProductoCategoriaField({
    label = "Categoría de Producto",
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxField>, 'options' | 'onCreateRequest'>) {
    const field = useFieldContext<ProductoCategoriaField>();

    const { data: options = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ProductoCategoria[]>>('api/producto_categorias')
            .then(r => r.data.data),
        select: toOptions
    });

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (data, _, __, { client }) => {
            setDialogIsOpen(false);
            client.invalidateQueries({ queryKey: ['producto_categorias'] });
            field.handleChange(data.data.data.id);
        }
    });

    const dialogForm = useForm(useDialogFormMutation);

    return (
        <>
            <CreatableComboboxField
                options={options}
                label={label}
                onCreateRequest={(searchValue) => {
                    dialogForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Categoría de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Creación de categoría de producto
                        </DialogDescription>
                    </DialogHeader>

                    <AppForm form={dialogForm} className="contents">
                        <DialogFooter>
                            <SubmitButton />

                            <Button onClick={() => setDialogIsOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </AppForm>
                </DialogContent>
            </Dialog>
        </>
    );
}
