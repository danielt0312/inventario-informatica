import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { Producto, ProductoWithMarca } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation, defaultFormOptions } from "./create/form";
import type { OutputSchema } from "./create/form-schema";

export interface ProductoFieldProps extends Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
> {
    tipo: number;
}

export type ProductoModeloField = CreatableComboboxField;
export function ProductoModeloField({
    label = "Modelo de Producto",
    tipo,
    ...props
}: ProductoFieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['productos', tipo],
        queryFn: () => api.get<TResponse<ProductoWithMarca[]>>('api/productos', {
            params: {
                include: ['marca'],
                filter: {
                    tipos: tipo,
                }
            }
        }).then(r => r.data.data),
        select: (data) => toOptions(data, 'marca.nombre')
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = <R extends TResponse<Producto>, P extends OutputSchema>() => useCreateFormMutation<R, P>({
        onSuccess: (_, __, ___, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['productos'] });
        }
    });

    const dialogForm = useForm(() => defaultFormOptions(useDialogFormMutation));
    dialogForm.setFieldValue('tipo_id', tipo);

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

                    <AppForm form={dialogForm} className="contents" showTipoField={false}>
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
