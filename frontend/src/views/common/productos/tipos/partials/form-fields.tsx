import { CreatableComboboxField } from "@/components/composed/@tanstack/form/field-components";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useFormMutation } from "../create/form";
import type { ProductoCategoriaWithTipos } from "@/types/productos";

export type FieldProps = Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
>;

export type TipoField = string;
export function TipoField({
    label = "Tipo de Producto",
    ...props
}: FieldProps) {
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

    const useDialogFormMutation = () => useFormMutation({
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
