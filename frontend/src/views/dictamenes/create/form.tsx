import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { dictamenDefaultValues, productoFieldsDefaultValues, validator } from "./form-schema";
import { useStore } from "@tanstack/react-form";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Card, CardContent } from "@/components/ui/card";
import { OficioField, CantidadField, FechaSolicitudField, FolioField, ProductoFieldGroup } from "./form-fields";
import { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import { Form as PrimitiveForm } from "@/components/composed/@tanstack/form/form-components";

export function useCreateFormMutation() {
    const navigate = useNavigate();

    return useFormMutation({
        url: 'api/dictamenes',
        onSuccess: (_, __, ___, context) => {
            context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            navigate({ to: IndexRoute.to });
        }
    });
}

export function useForm() {
    const formMutation = useCreateFormMutation();

    return useAppForm({
        defaultValues: dictamenDefaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            const formData = new FormData();

            formData.append('adscripcion_id', String(data.adscripcion_id));
            formData.append('folio', data.folio);
            formData.append('fecha_solicitud', data.fecha_solicitud);

            data.adquisiciones.forEach((adquisicion, index) => {
                formData.append(`adquisiciones[${index}][cantidad]`, String(adquisicion.cantidad));
                formData.append(`adquisiciones[${index}][empleado_id]`, String(adquisicion.empleado_id));
                formData.append(`adquisiciones[${index}][producto_tipo_id]`, String(adquisicion.producto_tipo_id));
                formData.append(`adquisiciones[${index}][numero_inventario]`, adquisicion.numero_inventario ?? '');
            });

            formData.append('archivo', data.archivo);

            formMutation.mutate({ data: formData, formApi });
        }
    });
}

export function Form() {
    const form = useForm();
    const adscripcion = useStore(form.store, (state) => state.values.adscripcion_id);

    return (
        <PrimitiveForm form={form} className="flex flex-col gap-6">
            <form.AppForm>
                <FieldGroup className="grid grid-cols-1 xl:grid-cols-3">
                    <form.AppField
                        name="adscripcion_id"
                        children={() => <AdscripcionField label="Área de Adscripción solicitante" />}
                    />
                    <form.AppField
                        name="folio"
                        children={() => <FolioField />}
                    />
                    <form.AppField
                        name="fecha_solicitud"
                        children={() => <FechaSolicitudField />}
                    />
                </FieldGroup>

                <form.AppField
                    name="archivo"
                    children={() => <OficioField className="md:max-w-1/2" />}
                />

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => field.pushValue(productoFieldsDefaultValues)}
                                >
                                    <PlusCircle /> Agregar
                                </Button>
                            </div>

                            {field.state.value.map((_, index) => (
                                <Card key={index} className="shadow-none">
                                    <CardContent className="flex gap-6 items-center">
                                        <form.AppField
                                            name={`adquisiciones[${index}].cantidad`}
                                            children={() => <CantidadField className="max-w-min" />}
                                        />

                                        <ProductoFieldGroup
                                            form={form}
                                            fields={{
                                                producto_tipo_id: `adquisiciones[${index}].producto_tipo_id`,
                                                numero_inventario: `adquisiciones[${index}].numero_inventario`,
                                            }}
                                        />

                                        <form.AppField
                                            name={`adquisiciones[${index}].empleado_id`}
                                            children={() => (
                                                <EmpleadoField
                                                    label="Resguardante"
                                                    adscripcion={adscripcion}
                                                />
                                            )}
                                        />

                                        <Button
                                            disabled={field.state.value.length === 1}
                                            onClick={() => field.removeValue(index)}
                                            variant="destructive"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}

                            <FieldError errors={field.state.meta.errors} />
                        </>
                    )}
                </form.AppField>

                <form.SubmitButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}
