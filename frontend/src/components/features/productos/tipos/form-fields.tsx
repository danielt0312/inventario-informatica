import type { ProductoCategoriaWithTipos } from "@/types/productos";
import type { TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import { AppForm, useForm, useCreateFormMutation } from "./create/form";
import { useFieldContext } from "@/components/ui/form-context";
import api from "@/lib/axios";
import React from "react";
import { CreatableComboboxFieldGrouped } from "@/components/ui/creatable-combobox-field-grouped";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxGroups } from "@/components/ui/combobox-layout.shared";
import { toComboboxItems } from "@/components/ui/combobox-layout.shared";

export type ProductoTipoFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;
export function ProductoTipoField({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldGrouped>, 'items' | 'onCreate'>) {
    const field = useFieldContext<ProductoTipoFieldType>();

    const { data: items = [] } = useQuery({
        queryKey: ['producto_categorias_tipos'],
        queryFn: () => api.get<TResponse<ProductoCategoriaWithTipos[]>>('api/producto_categorias', {
            params: {
                include: 'tipos'
            }
        }).then(r => r.data.data),
    });

    const groupedItems = React.useMemo(() =>
        toComboboxGroups(items, (group) => ({
            items: toComboboxItems(group.tipos, (item) => ({
                label: item.nombre,
                value: item.id,
            })),
            label: group.nombre,
        })), [items]);

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
            <CreatableComboboxFieldGrouped
                items={groupedItems}
                layout={{
                    label: "Tipo de Producto",
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
                        <DialogTitle>Registrar Tipo de Producto</DialogTitle>
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
