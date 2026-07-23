import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { TResponse } from "@/types/generics";
import type { Proveedor } from "@/types/orden_compras";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateProveedorForm, useCreateProveedorFormMutation, AppCreateProveedorForm } from "./create/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

export type ProveedorField = CreatableComboboxField;
export const ProveedorField = ({
    label = "Proveedor",
    disabled,
    ...props
}: Omit<React.ComponentProps<typeof CreatableComboboxField>, 'options'>) => {
    const field = useFieldContext<ProveedorField>();

    const { data: options = [] } = useQuery({
        queryKey: ['proveedores'],
        queryFn: () => api.get<TResponse<Proveedor[]>>('api/proveedores')
            .then(r => r.data.data),
        select: toOptions,
        enabled: !disabled
    });

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
            <CreatableComboboxField
                options={options}
                label={label}
                onCreateRequest={(searchValue) => {
                    createForm.setFieldValue('nombre', searchValue);
                    setDialogIsOpen(true);
                    field.handleChange(undefined);
                }}
                disabled={disabled}
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
                            <SubmitButton />

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
