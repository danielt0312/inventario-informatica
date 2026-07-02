import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { ProductoCategoria } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import { SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";

type ProductoCategoriaValue = number;

export interface RootProductoCategoriaFieldProps extends Omit<
    React.ComponentProps<typeof CreatableComboboxField>,
    'options' | 'onCreateRequest' | 'value' | 'onValueChange'
> {
    value: ProductoCategoriaField;
    onValueChange: (value: ProductoCategoriaField) => void;
}

export function RootProductoCategoriaField({
    label = "Categoría de Producto",
    value,
    onValueChange,
    ...props
}: RootProductoCategoriaFieldProps) {
    const { data: options = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ProductoCategoria[]>>('api/producto_categorias')
            .then(r => r.data.data),
        select: toOptions
    });

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useCreateFormMutation({
        onSuccess: (_, __, ___, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['producto_categorias'] });
        }
    });

    const dialogForm = useForm({ useMutationHook: useDialogFormMutation });

    return (
        <>
            <CreatableComboboxField
                options={options}
                label={label}
                value={value === undefined ? '' : String(value)}
                onValueChange={(v) => onValueChange(v === '' ? undefined : Number(v))}
                onCreateRequest={(searchValue) => {
                    dialogForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Categoría de Producto</DialogTitle>
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

export type ProductoCategoriaField = ProductoCategoriaValue | undefined;
interface TProductoCategoriaFieldProps extends Omit<RootProductoCategoriaFieldProps, 'value' | 'onValueChange'> {
}
export const ProductoCategoriaField = (props: TProductoCategoriaFieldProps) => {
    const field = useFieldContext<ProductoCategoriaField>();

    return (
        <RootProductoCategoriaField
            value={field.state.value}
            onValueChange={field.handleChange}
            {...props}
        />
    );
}

export type NullableProductoCategoriaField = ProductoCategoriaValue | null;
export function NullableProductoCategoriaField(props: TProductoCategoriaFieldProps) {
    const field = useFieldContext<NullableProductoCategoriaField>();
    return (
        <RootProductoCategoriaField
            value={field.state.value ?? undefined}
            onValueChange={(v) => field.handleChange(v ?? null)}
            {...props}
        />
    );
}
