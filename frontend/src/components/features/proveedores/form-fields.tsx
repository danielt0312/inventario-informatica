import type { TResponse } from "@/types/generics";
import type { Proveedor } from "@/types/orden_compras";
import { useFieldContext } from "@/components/ui/form-context";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useCreateProveedorForm, useCreateProveedorFormMutation, AppCreateProveedorForm } from "./create/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import api from "@/lib/axios";
import { CreatableComboboxFieldSimple } from "@/components/ui/creatable-combobox-field-simple";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";

export type ProveedorFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;
export const ProveedorField = ({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxFieldSimple>, 'items' | 'onCreate'>) => {
    const field = useFieldContext<ProveedorFieldType>();

    const { data = [] } = useQuery({
        queryKey: ['proveedores'],
        queryFn: () => api.get<TResponse<Proveedor[]>>('api/proveedores')
            .then(r => r.data.data),
    });

    const items = React.useMemo(() => toComboboxCatalogItems(data), [data]);

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const useCreateFormMutation = () => useCreateProveedorFormMutation({
        onSuccess: (data, _, __, { client }) => {
            setDialogIsOpen(false)
            client.invalidateQueries({ queryKey: ['proveedores'] });
            field.handleChange(data.data.data.id);
        }
    });

    const createForm = useCreateProveedorForm(useCreateFormMutation);

    return (
        <>
            <CreatableComboboxFieldSimple
                items={items}
                layout={{
                    label: "Proveedor",
                    ...layout
                }}
                onCreate={(searchValue) => {
                    createForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                {...props}
            />

            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Proveedor</DialogTitle>
                        <DialogDescription className="sr-only">
                            Registro de nuevo proveedor
                        </DialogDescription>
                    </DialogHeader>

                    <AppCreateProveedorForm form={createForm} className="contents">
                        <DialogFooter>
                            <createForm.SubmitFormButton />

                            <Button onClick={() => setDialogIsOpen(false)} variant="outline">
                                <XCircleIcon /> Cerrar
                            </Button>
                        </DialogFooter>
                    </AppCreateProveedorForm>
                </DialogContent>
            </Dialog>
        </>
    );
}
