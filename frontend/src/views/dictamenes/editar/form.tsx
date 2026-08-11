import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/editar";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { CantidadField, CaracteristicasField, FechaSolicitudField, FolioField, OficioField } from "../partials/form-fields";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleArrowRightIcon, PlusCircleIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import { DictamenProducto } from "@/lib/utils";
import { NullableNumeroInventarioField } from "@/views/common/articulos/form-fields";
import { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import { adquisicionFieldsDefaultValues, defaultValues, validator } from "./form-schema";
import { ProductoField } from "@/views/common/productos/form-fields";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import type { DetailedSurtirDictamen, SurtirDictamen } from "@/types/dictamenes";
import React from "react";
import { FieldValue } from "@/components/ui/field-value";

function useEditFormMutation(dictamen: SurtirDictamen) {
    const navigate = useNavigate();

    return useFormMutation({
        url: `api/dictamenes/${dictamen.uuid}`,
        method: 'PATCH',
        onSuccess: async (_, __, ___, context) => {
            await context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            await navigate({ to: IndexRoute.to });
        }
    });
}

function useForm(dictamen: DetailedSurtirDictamen) {
    const { mutate } = useEditFormMutation(dictamen);

    return useAppForm({
        defaultValues: defaultValues(dictamen),
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });
}

export const DictamenEditarForm = () => {
    const { dictamen } = EditarRoute.useRouteContext();

    const form = useForm(dictamen);
    const adscripcion = dictamen.adscripcion?.id ?? 1;
    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const [showNumeroInventarioField, setShowNumeroInventarioField] = React.useState(false);

    return (
        <Form form={form} className="flex flex-col gap-6">
            <form.AppForm>
                <FieldGroup className="flex-row">
                    <FieldValue
                        label="Área de Adscripción"
                        value={dictamen.adscripcion?.nombre ?? 'Dirección de Tecnologías de la Información'}
                    />
                    <form.AppField
                        name="fecha_solicitud"
                        children={() => <FechaSolicitudField disabled />}
                    />
                    <form.AppField
                        name="folio"
                        children={() => <FolioField />}
                    />
                </FieldGroup>

                <form.AppField
                    name="archivo_uuid"
                    children={() => (
                        <OficioField
                            defaultValue={dictamen.version_actual.oficio.archivo}
                            className="md:max-w-1/2"
                        />
                    )}
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
                                    <CardContent className="flex gap-6">
                                        <div className="flex flex-col gap-6 grow">
                                            <div className="flex flex-row gap-7">
                                                <FieldGroup className="flex-row w-2/3">
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].cantidad`}
                                                        children={() => <CantidadField className="max-w-min" />}
                                                    />

                                                    <form.AppField
                                                        name={`adquisiciones[${index}].producto_tipo_id`}
                                                        children={() => <ProductoTipoField required />}
                                                        listeners={{
                                                            onMount: ({ fieldApi }) => fieldApi.triggerOnChangeListener(),
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
                                                        children={() => (
                                                            <ProductoField tipo={field.state.value[index].producto_tipo_id} required />
                                                        )}
                                                    />
                                                </FieldGroup>

                                                <form.AppField
                                                    name={`adquisiciones[${index}].empleado_id`}
                                                    children={() => (
                                                        <EmpleadoField
                                                            label="Resguardante"
                                                            adscripcion={adscripcion}
                                                            className="w-1/3"
                                                            required
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <FieldGroup className="flex-row">
                                                <form.AppField
                                                    name={`adquisiciones[${index}].caracteristicas`}
                                                    children={() => <CaracteristicasField className="w-1/2" />}
                                                />

                                                <div className="w-1/2">
                                                    {showNumeroInventarioField && (
                                                        <form.AppField
                                                            name={`adquisiciones[${index}].numero_inventario`}
                                                            children={() => <NullableNumeroInventarioField required />}
                                                        />
                                                    )}
                                                </div>
                                            </FieldGroup>
                                        </div>

                                        <Button
                                            disabled={field.state.value.length === 1}
                                            onClick={() => field.removeValue(index)}
                                            variant="destructive"
                                            className="max-w-min place-self-center"
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

                <SubmitButton
                    label="Guardar edición"
                    icon={<SquarePenIcon />}
                    type="button"
                    onClick={async () => {
                        form.validateSync('submit');
                        await form.validateAsync('submit');
                        if (!form.state.isValid) return;
                        setShowAlertDialog(true);
                    }}
                />

                <AlertDialog onOpenChange={setShowAlertDialog} open={showAlertDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                ¿Estás seguro de continuar?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Al continuar, el número de dictamen será actualizado y el documento será regenerado con los cambios solicitados.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => form.handleSubmit()}>
                                Continuar <CircleArrowRightIcon />
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form.AppForm>
        </Form >
    );
}
