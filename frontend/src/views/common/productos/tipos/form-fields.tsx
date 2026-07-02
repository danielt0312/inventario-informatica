import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import type { ProductoCategoriaWithTipos } from "@/types/productos";

export interface RootProductoFieldProps extends Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
> {
}
export type ProductoTipoField = CreatableComboboxField;
export function ProductoTipoField({
    label = "Tipo de Producto",
    ...props
}: RootProductoFieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_categorias_tipos'],
        queryFn: () => api.get<TResponse<ProductoCategoriaWithTipos[]>>('api/producto_categorias', {
            params: {
                include: 'tipos'
            }
        }).then(r => r.data.data),
        select: (data) => toOptions(data, 'tipos.nombre')
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (_, __, ___, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['producto_categorias_tipos'] });
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
                        <DialogTitle>Crear Tipo de Producto</DialogTitle>
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
