import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { useFormMutation } from "../form";
import { validator, type Schema, type ValidatedDictamen } from "./form-schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table as FacturaTable } from "@/views/facturas/partials/table";
import { FieldError } from "@/components/ui/field";
import { FilePreviewWindow } from "@/components/custom/file-preview-window";

export function useForm(dictamen: ValidatedDictamen) {
    const formMutation = useFormMutation(dictamen);

    const formattedProductos = dictamen.productos.map(v => ({
        id: String(v.id),
        archivo_uuid: ''
    }));

    const defaultValues: Schema = {
        productos: formattedProductos
    }

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            formMutation.mutate({ data, formApi: formApi });
        }
    });
}

export function Form({ dictamen }: { dictamen: ValidatedDictamen }) {
    const form = useForm(dictamen);
    const [open, setOpen] = useState(false);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="contents"
        >
            <form.AppForm>
                <div className="rounded-lg overflow-hidden border border-neutral-200">
                    <Table>
                        <TableHeader className="[&_tr]:bg-neutral-100 [&_tr]:hover:bg-neutral-100 [&_th]:font-bold [&_th]:text-center">
                            <TableRow>
                                <TableHead colSpan={2} className="border-r">
                                    Bien Informático
                                </TableHead>
                                <TableHead rowSpan={2} className="border-r w-1/4">
                                    Resguardante
                                </TableHead>
                                <TableHead rowSpan={2} className="w-1/4">
                                    Factura
                                </TableHead>
                            </TableRow>

                            <TableRow>
                                <TableHead className="border-r">
                                    Cantidad
                                </TableHead>
                                <TableHead className="border-r">
                                    Especificaciones técnicas
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="[&_tr]:hover:bg-transparent [&_td]:border-r">
                            {dictamen.productos.map((d, index) => (
                                <TableRow key={index}>
                                    <TableCell className="w-25">
                                        <div data-slot="label">
                                            <Label className="text-center">{d.cantidad}</Label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="grid grid-cols-1 gap-6">
                                        <div data-slot="label">
                                            <Label className="font-bold">Producto</Label>
                                            <Label>
                                                {d.producto.tipo.nombre} {d.producto.marca.nombre} {d.producto.nombre}
                                            </Label>
                                        </div>
                                        <div data-slot="label">
                                            <Label className="font-bold">Características</Label>
                                            <Label className="">{d.caracteristicas}</Label>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-slot="label">
                                            <Label className="text-center">
                                                {d.empleado?.nombre ?? 'Juan Pérez'}
                                            </Label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center border-none">
                                        <form.AppField
                                            name={`productos[${index}].archivo_uuid`}
                                            children={(field) => (
                                                <>
                                                    <div className="flex flex-col gap-2 items-center">
                                                        <FilePreviewWindow
                                                            uuid={field.state.value}
                                                            onClick={() => setOpen(true)}
                                                            className="max-w-fit"
                                                            children={<><Paperclip /> Adjuntar</>}
                                                            previewButtonProps={{
                                                                disabled: !field.state.value
                                                            }}
                                                        />

                                                        <FieldError errors={field.state.meta.errors} />
                                                    </div>

                                                    <Dialog
                                                        open={open}
                                                        onOpenChange={setOpen}
                                                    >
                                                        <DialogContent className="min-w-5xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Facturas</DialogTitle>
                                                            </DialogHeader>

                                                            <FacturaTable
                                                                queryOptions={{
                                                                    enabled: open
                                                                }}
                                                                columns={[
                                                                    {
                                                                        id: 'selector',
                                                                        cell: ({ row }) => {
                                                                            const factura = row.original;

                                                                            return (
                                                                                <Button
                                                                                    variant="outline"
                                                                                    onClick={() => {
                                                                                        field.handleChange(factura.uuid);
                                                                                        setOpen(false);
                                                                                    }}
                                                                                >
                                                                                    <Paperclip /> Adjuntar
                                                                                </Button>
                                                                            );
                                                                        }
                                                                    }
                                                                ]}
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                </>
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <form.SubmitButton />
            </form.AppForm>
        </form>
    );
}
