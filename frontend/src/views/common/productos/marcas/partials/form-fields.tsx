import { CreatableComboboxField } from "@/components/composed/@tanstack/form/field-components";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { ProductoMarca } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "../create/form";

export interface MarcaFieldProps extends Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
> {}

export type MarcaField = string;
export function MarcaField({
    label = "Marca del Producto",
    ...props
}: MarcaFieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_marcas'],
        queryFn: () => api.get<TResponse<ProductoMarca[]>>('api/producto_marcas')
            .then(r => r.data.data),
        select: toOptions
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (_, __, ___, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['producto_marcas'] });
        }
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
                        <DialogTitle>Crear Marca de Producto</DialogTitle>
                    </DialogHeader>

                    <AppForm form={dialogForm} className="contents">
                        <DialogFooter>
                            <dialogForm.SubmitButton />

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
