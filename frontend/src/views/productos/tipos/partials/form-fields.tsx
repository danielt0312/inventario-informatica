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
import { useForm, useFormMutation } from "../create/form";

export type FieldProps = Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest'
>;

export function Field({
    label = 'Tipo',
    ...props
}: FieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ProductoCategoria[]>>('api/producto_categorias', {
            params: {
                include: 'tipos'
            }
        }).then(r => r.data.data),
        select: toOptions
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useFormMutation({
        onSuccess: () => setDialogIsOpen(false)
    });
    const useDialogForm = () => useForm({
        useMutationHook: useDialogFormMutation
    });

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <>
            <CreatableComboboxField
                options={options}
                label={label}
                onCreateRequest={(searchValue) => {
                    setSearchValue(searchValue);
                    setDialogIsOpen(true);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear nueva categoria</DialogTitle>
                    </DialogHeader>

                    <Form
                        useFormHook={useDialogForm}
                        className="contents"
                    >
                        {(form) => {
                            form.setFieldValue('nombre', searchValue);

                            return (
                                <DialogFooter>
                                    <form.SubmitButton />

                                    <Button
                                        // type="reset"
                                        onClick={() => setDialogIsOpen(false)}
                                    >
                                        <XCircleIcon /> Cerrar
                                    </Button>
                                </DialogFooter>
                            );
                        }}
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
