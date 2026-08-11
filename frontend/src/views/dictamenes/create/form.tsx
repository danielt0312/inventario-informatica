import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { dictamenDefaultValues, productoFieldsDefaultValues, validator } from "./form-schema";
import { useStore } from "@tanstack/react-form";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Card, CardContent } from "@/components/ui/card";
import { OficioField, CantidadField, FechaSolicitudField, FolioField } from "../partials/form-fields";
import { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import { Form as PrimitiveForm } from "@/components/composed/@tanstack/form/form-components";
import { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import { NumeroInventarioField } from "@/views/common/articulos/form-fields";
import { DictamenProducto } from "@/lib/utils";
import React from "react";

export function useCreateFormMutation() {
    const navigate = useNavigate();

    return useFormMutation({
        url: 'api/dictamenes',
        onSuccess: async (_, __, ___, context) => {
            await context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            await navigate({ to: IndexRoute.to });
        }
    });
}

export function useForm() {
    const { mutate } = useCreateFormMutation();

    return useAppForm({
        defaultValues: dictamenDefaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });
}

export function Form() {
    const form = useForm();
    const adscripcion = useStore(form.store, (state) => state.values.adscripcion_id);
    const [showNumeroInventarioField, setShowNumeroInventarioField] = React.useState(false);

    return (
        <PrimitiveForm form={form} className="flex flex-col gap-6">
            <form.AppForm>
                <FieldGroup className="flex-row">
                    <form.AppField
                        name="fecha_solicitud"
                        children={() => <FechaSolicitudField />}
                    />
                    <form.AppField
                        name="adscripcion_id"
                        children={() => <AdscripcionField label="Área de Adscripción solicitante" />}
                    />
                    <form.AppField
                        name="folio"
                        children={() => <FolioField />}
                    />
                </FieldGroup>

                <form.AppField
                    name="archivo_uuid"
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
                                    <PlusCircleIcon /> Agregar
                                </Button>
                            </div>

                            {field.state.value.map((_, index) => (
                                <Card key={index} className="shadow-none">
                                    <CardContent className="flex gap-6 items-center">
                                        <form.AppField
                                            name={`adquisiciones[${index}].cantidad`}
                                            children={() => <CantidadField className="max-w-min" />}
                                        />

                                        <FieldGroup>
                                            <form.AppField
                                                name={`adquisiciones[${index}].producto_tipo_id`}
                                                children={() => (
                                                    <ProductoTipoField />
                                                )}
                                                listeners={{
                                                    onChange: ({ value }) => {
                                                        const requiereNumeroInventario = DictamenProducto.tipoRequiereNumeroInventario(value);
                                                        setShowNumeroInventarioField(requiereNumeroInventario);

                                                        if (!requiereNumeroInventario) {
                                                            form.setFieldValue(`adquisiciones[${index}].numero_inventario`, null);
                                                        }
                                                    }
                                                }}
                                            />

                                            {showNumeroInventarioField && (
                                                <form.AppField
                                                    name={`adquisiciones[${index}].numero_inventario`}
                                                    children={() => (
                                                        <NumeroInventarioField />
                                                    )}
                                                />
                                            )}
                                        </FieldGroup>

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
                                            <Trash2Icon />
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
