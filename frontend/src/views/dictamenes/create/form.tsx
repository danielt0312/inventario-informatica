import { useAppForm } from "@/components/composed/@tanstack/form";
import { DatePickerField, FileUploaderField, TextField } from "@/components/composed/@tanstack/form-field";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { toISODate } from "@/lib/utils";
import { PlusCircle, Trash2 } from "lucide-react";
import { dictamenDefaultValues, dictamenProductoDefaultValues, validator } from "./form-schema";
import { FieldGroupProductoFields } from "@/views/productos/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmpleadoField } from "@/views/empleados/partials/form";
import { useStore } from "@tanstack/react-form";
import { AdscripcionField } from "@/views/adscripciones/partials/form";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { useNavigate } from "@tanstack/react-router";
import { usePostFormMutation } from "@/hooks/use-post-form-mutation";

export function useFormMutation() {
    const navigate = useNavigate();

    return usePostFormMutation({
        url: 'api/dictamenes',
        onSuccess: (_, __, ___, context) => {
            context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            navigate({ to: IndexRoute.to })
        }
    });
}

export function useForm() {
    const formMutation = useFormMutation();

    return useAppForm({
        defaultValues: dictamenDefaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            const formData = new FormData();

            formData.append('adscripcion_id', data.adscripcion_id);
            formData.append('folio', data.folio);
            formData.append('fecha_solicitud', data.fecha_solicitud);
            formData.append('archivo', data.archivo[0]);

            data.productos.forEach((producto, index) => {
                formData.append(`productos[${index}][cantidad]`, String(producto.cantidad));
                formData.append(`productos[${index}][producto_id]`, String(producto.producto_id));
                formData.append(`productos[${index}][empleado_id]`, String(producto.empleado_id));
            });

            formMutation.mutate({ data: formData, formApi });
        }
    });
}

export function Form() {
    const form = useForm();
    const adscripcion = useStore(form.store, (state) => state.values.adscripcion_id);

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
                <FieldGroup className="grid grid-cols-3">
                    <form.AppField
                        name="adscripcion_id"
                        children={() => <AdscripcionField label="Área de Adscripción solicitante" />}
                    />
                    <form.AppField
                        name="folio"
                        children={() => (
                            <TextField
                                label="Folio del oficio de solicitud"
                                placeholder="Ingresa el folio del oficio de la solicitud"
                            />
                        )}
                    />
                    <form.AppField
                        name="fecha_solicitud"
                        children={() => (
                            <DatePickerField
                                label="Fecha de solicitud"
                                parseValue={toISODate}
                                placeholder="Selecciona la fecha de la solicitud"
                            />
                        )}
                    />
                    <form.AppField
                        name="archivo"
                        children={() => (
                            <FileUploaderField
                                label="Adjuntar oficio de solicitud"
                                accept="application/pdf"
                            />
                        )}
                    />
                </FieldGroup>

                <form.AppField
                    name="productos"
                    mode="array"
                >
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
                                <Button
                                    variant="outline"
                                    type="button"
                                    size="sm"
                                    onClick={() => field.pushValue(dictamenProductoDefaultValues)}
                                >
                                    <PlusCircle /> Agregar
                                </Button>
                            </div>

                            <div className="rounded-lg overflow-hidden border border-neutral-200">
                                <Table>
                                    <TableHeader className="[&_tr]:bg-neutral-100 [&_tr]:hover:bg-neutral-100 [&_th]:font-bold [&_th]:text-center [&_th]:border-r">
                                        <TableRow>
                                            <TableHead colSpan={2}>
                                                Bien Informático
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border-none w-1/4">
                                                Resguardante
                                            </TableHead>
                                            <TableHead rowSpan={2} className="border-none" />
                                        </TableRow>

                                        <TableRow>
                                            <TableHead>
                                                Cantidad
                                            </TableHead>
                                            <TableHead>
                                                Especificaciones técnicas
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="[&_tr]:hover:bg-transparent [&_td]:border-r [&_td:nth-last-child(-n+2)]:border-r-transparent">
                                        {field.state.value.length > 0 && field.state.value.map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="w-25">
                                                    <form.AppField
                                                        name={`productos[${index}].cantidad`}
                                                        children={() => (
                                                            <TextField
                                                                placeholder="Ingresa una cantidad"
                                                            />
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell className="grid grid-cols-1 gap-6">
                                                    <FieldGroupProductoFields
                                                        form={form}
                                                        fields={{
                                                            id: `productos[${index}].producto_id`,
                                                            categoria_id: `productos[${index}].producto_categoria_id`,
                                                            tipo_id: `productos[${index}].producto_tipo_id`,
                                                            marca_id: `productos[${index}].producto_marca_id`,
                                                        }}
                                                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <form.AppField
                                                        name={`productos[${index}].empleado_id`}
                                                        children={() => <EmpleadoField adscripcion={adscripcion} />}
                                                    />
                                                </TableCell>
                                                <TableCell className="max-w-fit text-center">
                                                    <Button
                                                        disabled={field.state.value.length === 1}
                                                        onClick={() => field.removeValue(index)}
                                                        variant="destructive"
                                                        type="button"
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <FieldError errors={field.state.meta.errors} />
                        </>
                    )}
                </form.AppField>

                <form.SubmitButton />
            </form.AppForm>
        </form >
    );
}
