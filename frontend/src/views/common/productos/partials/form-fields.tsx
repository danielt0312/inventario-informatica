import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { ProductoWithMarca } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "../create/form";

export interface ProductoFieldProps extends Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
> {
    tipo_id: number;
}

export function ProductoField({
    label = "Modelo de Producto",
    tipo_id,
    ...props
}: ProductoFieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['productos', tipo_id],
        queryFn: () => api.get<TResponse<ProductoWithMarca[]>>('api/productos', {
            params: {
                include: ['marca'],
                filter: {
                    tipos: tipo_id,
                }
            }
        }).then(r => r.data.data),
        select: (data) => toOptions(data, 'marca.nombre')
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (_, __, ___, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['productos'] });
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
                        <DialogTitle>Crear Modelo de Producto</DialogTitle>
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
