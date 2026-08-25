import type { TResponse } from "@/types/generics";
import type { ProductoCategoria } from "@/types/productos";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import { useFieldContext } from "@/components/ui/form-context";
import api from "@/lib/axios";
import React from "react";
import { CreatableComboboxFieldSimple } from "@/components/ui/creatable-combobox-field-simple";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";

export type ProductoCategoriaFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;
export function ProductoCategoriaField({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldSimple>, 'items' | 'onCreate'>) {
    const field = useFieldContext<ProductoCategoriaFieldType>();

    const { data = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ProductoCategoria[]>>('api/producto_categorias')
            .then(r => r.data.data),
    });

    const items = React.useMemo(() => toComboboxCatalogItems(data), [data]);

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

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
            <CreatableComboboxFieldSimple
                items={items}
                layout={{
                    label: "Categoría de Producto",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    dialogForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Categoría de Producto</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registrar nueva categoría de producto
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
