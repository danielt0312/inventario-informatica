import type { Factura } from "@/types/documentos";
import type { ProveedorFieldType } from "../proveedores/field";
import type { TResponse } from "@/types/generics";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircleIcon } from "lucide-react";
import { QueryDataTable } from "@/components/ui/query-datatable";
import { facturaInitialTableState, facturaDefaultTableColumns } from "./table-cols";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { FormLayout } from "@/components/ui/form-layout";
import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { ArchivoUploaderField, type ArchivoUploaderFieldType } from "../archivos/uploader-field";
import { requiredIsoDateLTEToday, requiredString } from "@/lib/schemas/common";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useAppForm } from "@/components/ui/form.shared";
import React from "react";
import z from "zod";
import { SubmitButton } from "@/components/ui/submit-button";
import { FieldGroup } from "@/components/ui/field";

interface FacturaFieldProps extends Omit<React.ComponentProps<typeof QueryDataTable<Factura>>, 'queryKey' | 'url'> {
    proveedorId?: ProveedorFieldType;
}

type Schema = {
    folio: InputFieldType;
    proveedor_id: ProveedorFieldType;
    fecha_emision: DatePickerFieldType;
    archivo_uuid: ArchivoUploaderFieldType;
}

const defaultValues: Schema = {
    folio: undefined,
    proveedor_id: undefined,
    fecha_emision: undefined,
    archivo_uuid: undefined
}

const validator = z.object({
    folio: requiredString,
    proveedor_id: z.number('Debes de adjuntar una orden de compra'),
    fecha_emision: requiredIsoDateLTEToday,
    archivo_uuid: requiredString
});

export function FacturaTable({
    proveedorId,
    tableOptions,
    columns = [],
    ...props
}: FacturaFieldProps) {
    const { mutate, isPending } = useFormMutation<TResponse<Factura>>({
        url: `api/facturas`,
        onSuccess: (data, _, __, { client }) => {
            const factura = data.data.data;
            client.setQueryData(['facturas'], (prev: Factura[] = []) => [...prev, factura]);
            client.invalidateQueries({ queryKey: ['facturas'] });
            setDialogOpen(false);
        }
    });

    const form = useAppForm({
        defaultValues: {
            ...defaultValues,
            proveedor_id: proveedorId,
        },
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ formApi, value }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    })

    const { mutate: mutateFilePreview, isPending: isPreviewing } = useFilePreviewWindowMutation();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
        <QueryDataTable
            queryKey={['facturas']}
            url="api/facturas"
            columns={[
                ...columns,
                ...facturaDefaultTableColumns
            ]}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setDialogOpen(true)} variant="secondary">
                        <PlusCircle /> Registrar
                    </Button>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} onOpenChangeComplete={(open) => !open && form.reset()}>
                        <DialogContent className="min-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Registro de Factura</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Registrar nueva factura
                                </DialogDescription>
                            </DialogHeader>

                            <FormLayout form={form} className="contents">
                                <form.AppForm>
                                    <FieldGroup className="flex-row">
                                        <form.AppField
                                            name="folio"
                                            children={() => (
                                                <InputField
                                                    placeholder="Ingresa el folio de la factura"
                                                    fieldLayout={{ label: "Folio de factura" }}
                                                    required
                                                />
                                            )}
                                        />

                                        <form.AppField
                                            name="fecha_emision"
                                            children={() => (
                                                <DatePickerField
                                                    placeholder="Ingresa la fecha de emisión"
                                                    fieldLayout={{ label: "Fecha de emisión" }}
                                                    required
                                                />)}
                                        />
                                    </FieldGroup>

                                    <form.AppField
                                        name="archivo_uuid"
                                        children={() => <ArchivoUploaderField fieldLayout={{ required: true }} />}
                                    />

                                    <DialogFooter>
                                        <SubmitButton isSubmitting={isPending} label="Registrar" spinnerLabel="Registrando..." />
                                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                            Cancelar <XCircleIcon />
                                        </Button>
                                    </DialogFooter>
                                </form.AppForm>
                            </FormLayout>
                        </DialogContent>
                    </Dialog>
                </>
            )}
            filter={{ proveedor: proveedorId }}
            tableOptions={{
                ...tableOptions,
                initialState: {
                    ...facturaInitialTableState,
                    ...tableOptions?.initialState
                },
                meta: {
                    ...tableOptions?.meta,
                    previewFile: (uuid, title) => mutateFilePreview({ uuid, title }),
                    isPreviewing,
                }
            }}
            {...props}
        />
    );
}
