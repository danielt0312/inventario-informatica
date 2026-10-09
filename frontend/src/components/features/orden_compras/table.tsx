import type { OrdenCompra } from "@/types/orden_compras";
import type { TResponse } from "@/types/generics";
import { ProveedorField, type ProveedorFieldType } from "../proveedores/field";
import { ArchivoUploaderField, type ArchivoUploaderFieldType } from "../archivos/uploader-field";
import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { ordenCompraDefaultColumns, ordenCompraInitialTableState } from "./table-cols";
import { QueryDataTable, type QueryDataTableProps } from "@/components/ui/query-datatable";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { FormLayout } from "@/components/ui/form-layout";
import { SubmitButton } from "@/components/ui/submit-button";
import { requiredIsoDateLTEToday, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { useAppForm } from "@/components/ui/form.shared";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { FieldGroup } from "@/components/ui/field";
import z from "zod";

type Schema = {
    proveedor_id: ProveedorFieldType;
    archivo_uuid: ArchivoUploaderFieldType;
    fecha_solicitud: DatePickerFieldType;
    numero_orden: InputFieldType;
}

const defaultValues: Schema = {
    proveedor_id: undefined,
    archivo_uuid: undefined,
    fecha_solicitud: undefined,
    numero_orden: undefined
}

const validator = z.object({
    proveedor_id: selectedNumberOption,
    archivo_uuid: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    numero_orden: requiredString
});

function Table({
    columns = [],
    tableOptions,
    ...props
}: Omit<QueryDataTableProps<OrdenCompra>, 'queryKey' | 'url'>) {
    const { mutate, isPending } = useFormMutation<TResponse<OrdenCompra>>({
        url: 'api/orden_compras',
        onSuccess: (data, _, __, { client }) => {
            const ordenCompra = data.data.data;
            client.setQueryData(['orden_compras'], (prev: OrdenCompra[] = []) => [...prev, ordenCompra]);
            client.invalidateQueries({ queryKey: ['orden_compras'] });
            setDialogOpen(false);
        }
    });
    const { mutate: previewFileMutation, isPending: isPreviewingFile } = useFilePreviewWindowMutation();

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });

    const [dialogOpen, setDialogOpen] = useState(false);


    return (
        <QueryDataTable
            queryKey={['orden_compras']}
            url="api/orden_compras"
            columns={[
                ...ordenCompraDefaultColumns,
                ...columns,
            ]}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setDialogOpen(true)} variant="secondary">
                        <PlusCircle /> Registrar
                    </Button>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent className="min-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Registrar Orden de Compra</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Registrar nueva orden de compra
                                </DialogDescription>
                            </DialogHeader>

                            <FormLayout form={form}>
                                <form.AppForm>
                                    <FieldGroup className="flex-row">
                                        <form.AppField
                                            name="numero_orden"
                                            children={() => (
                                                <InputField
                                                    placeholder="Ingresa el número de la orden de compra"
                                                    fieldLayout={{ label: "Orden No." }}
                                                    required
                                                />
                                            )}
                                        />

                                        <form.AppField
                                            name="fecha_solicitud"
                                            children={() => (
                                                <DatePickerField
                                                    fieldLayout={{ label: "Fecha de Solicitud" }}
                                                    required
                                                />
                                            )}
                                        />
                                    </FieldGroup>


                                    <form.AppField
                                        name="proveedor_id"
                                        children={() => (
                                            <ProveedorField required />
                                        )}
                                    />

                                    <form.AppField
                                        name="archivo_uuid"
                                        children={(field) => (
                                            <ArchivoUploaderField
                                                onValueChange={(value) => field.handleChange(value?.uuid)}
                                                fieldLayout={{ required: true }}
                                            />
                                        )}
                                    />

                                    <DialogFooter>
                                        <SubmitButton isSubmitting={isPending} label="Registrar" spinnerLabel="Registrando..." />
                                        <Button onClick={() => setDialogOpen(false)} variant="outline">
                                            <XCircleIcon /> Cancelar
                                        </Button>
                                    </DialogFooter>
                                </form.AppForm>
                            </FormLayout>
                        </DialogContent>
                    </Dialog>
                </>
            )}
            tableOptions={{
                meta: {
                    previewFile: (uuid, title) => previewFileMutation({ uuid, title }),
                    isPreviewing: isPreviewingFile,
                    ...tableOptions?.meta,
                },
                initialState: ordenCompraInitialTableState,
                ...tableOptions,
            }}
            {...props}
        />
    );
}

export {
    Table as OrdenCompraTable
}
