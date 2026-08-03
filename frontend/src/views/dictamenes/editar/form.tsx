import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Route } from "@/routes/_auth/dictamenes/$uuid/editar";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { CantidadField, FechaSolicitudField, FolioField, OficioField } from "../partials/form-fields";
import { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import { DictamenProducto } from "@/lib/utils";
import React from "react";
import { NumeroInventarioField } from "@/views/common/articulos/form-fields";
import { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import { adquisicionFieldsDefaultValues, defaultValues } from "./form-schema";
import { useStore } from "@tanstack/react-form";
import { ProductoField } from "@/views/common/productos/form-fields";

export const DictamenEditarForm = () => {
    const { dictamen } = Route.useRouteContext();

    const form = useAppForm({
        defaultValues: defaultValues(dictamen),
    });

    const adscripcion = useStore(form.store, (state) => state.values.adscripcion_id);
    const [showNumeroInventarioField, setShowNumeroInventarioField] = React.useState(false);

    return (
        <Form form={form} className="flex flex-col gap-6">
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
                    children={() => <OficioField className="md:max-w-1/2" archivo={dictamen.version_actual.oficio.archivo} />}
                />

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => field.pushValue(adquisicionFieldsDefaultValues)}
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

                                            <form.AppField
                                                name={`adquisiciones[${index}].producto_tipo_id`}
                                                children={() => <ProductoTipoField />}
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

                                            <form.AppField
                                                name={`adquisiciones[${index}].producto_id`}
                                                children={() => <ProductoField tipo={field.state.value.at(index)?.producto_tipo_id} />}
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

                <SubmitButton />
            </form.AppForm>
        </Form>
    );
}
