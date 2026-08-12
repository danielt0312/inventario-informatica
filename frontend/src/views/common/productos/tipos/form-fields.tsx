import { CreatableComboboxField, type CreatableComboboxFieldType } from "@/components/ui/creatable-combobox-field";
import api from "@/lib/axios";
import { toComboboxOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import type { ProductoCategoriaWithTipos } from "@/types/productos";
import { useFieldContext } from "@/components/ui/form-context";

export type ProductoTipoFieldType = CreatableComboboxFieldType;
export function ProductoTipoField({
    label = "Tipo de Producto",
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxField>, 'options' | 'onCreateRequest'>) {
    const field = useFieldContext<ProductoTipoFieldType>();

    const { data: options = [] } = useQuery({
        queryKey: ['producto_categorias_tipos'],
        queryFn: () => api.get<TResponse<ProductoCategoriaWithTipos[]>>('api/producto_categorias', {
            params: {
                include: 'tipos'
            }
        }).then(r => r.data.data),
        select: (data) => toComboboxOptions(data, 'tipos.nombre')
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (data, _, __, { client }) => {
            setDialogIsOpen(false);
            client.invalidateQueries({ queryKey: ['producto_categorias_tipos'] });
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
                        <DialogTitle>Regitrar Tipo de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registrar nuevo tipo de producto
                        </DialogDescription>
                    </DialogHeader>

                    <AppForm form={dialogForm} className="contents">
                        <DialogFooter>
                            <dialogForm.SubmitFormButton />

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
