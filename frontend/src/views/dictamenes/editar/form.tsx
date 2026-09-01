import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAppForm } from "@/components/ui/form-context";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/editar";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { Form } from "@/components/ui/form";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { CantidadField, DictamenEspecificacionesTecnicasField, DictamenMotivoCambioField } from "../partials/form-fields";
import { Button } from "@/components/ui/button";
import { CircleArrowRightIcon, CircleXIcon, PlusCircleIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductoTipoField } from "@/components/features/productos/tipos/form-fields";
import { DictamenAdquisicion } from "@/lib/utils";
import { ArticuloNullableNumeroInventarioField } from "@/components/features/articulos/form-fields";
import { EmpleadoField } from "@/components/features/externos/empleados/form-fields";
import { adquisicionFieldsDefaultValues, defaultValues, validator } from "./form-schema";
import { ProductoField } from "@/components/features/productos/form-fields";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { FieldValue } from "@/components/ui/field-value";
import { ShowBienesInformaticosTitle } from "../partials/show-info";
import type { PorSurtirDictamen } from "@/types/dictamenes";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { ShowOficioInfo } from "../form-actions/partials/show-info";
import { BaseFieldLayout } from "@/components/ui/field-layout";
import { DatePicker } from "@/components/ui/date-picker";

function useEditFormMutation(dictamen: PorSurtirDictamen) {
    const navigate = useNavigate();

    return useFormMutation({
        url: `api/dictamenes/${dictamen.uuid}`,
        method: 'PUT',
        onSuccess: async (_, __, ___, context) => {
            await context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            await navigate({ to: IndexRoute.to });
        }
    });
}

export const DictamenEditarForm = () => {
    const { dictamen } = EditarRoute.useRouteContext();

    const { mutate, status } = useEditFormMutation(dictamen);

    const form = useAppForm({
        defaultValues: defaultValues(dictamen),
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });

    const [showAlertDialog, setShowAlertDialog] = React.useState(false);

    return (
        <Form form={form} className="flex flex-col gap-6">
            <form.AppForm>
                <FieldGroup className="flex-row">
                    <FieldValue
                        label="Área de Adscripción"
                        value={dictamen.adscripcion.nombre}
                    />
                    <BaseFieldLayout label="Fecha de solicitud" required disabled>
                        <DatePicker value={new Date} disabled />
                    </BaseFieldLayout>
                    {/* todo cambiar esto por el layout utilizando el field */}
                    {dictamen.oficio && (
                        <ShowOficioInfo oficio={dictamen.oficio} className="w-full flex flex-col gap-3" />
                    )}
                </FieldGroup>

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <ShowBienesInformaticosTitle />
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
                                                    />

                                                    <form.Subscribe selector={(state) => state.values.adquisiciones[index].producto_tipo_id}>
                                                        {(productoTipoId) => (
                                                            <form.AppField
                                                                name={`adquisiciones[${index}].producto_id`}
                                                                children={() => (
                                                                    <ProductoField tipo={productoTipoId} required />
                                                                )}
                                                            />
                                                        )}
                                                    </form.Subscribe>
                                                </FieldGroup>

                                                <form.AppField
                                                    name={`adquisiciones[${index}].empleado_id`}
                                                    children={() => (
                                                        <EmpleadoField
                                                            adscripcionId={dictamen.adscripcion.id}
                                                            className="w-1/3"
                                                            required
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <FieldGroup className="flex-row">
                                                <form.AppField
                                                    name={`adquisiciones[${index}].especificaciones_tecnicas`}
                                                    children={() => <DictamenEspecificacionesTecnicasField className="w-1/2" />}
                                                />

                                                <div className="w-1/2">
                                                    <form.Subscribe selector={(state) => state.values.adquisiciones[index].producto_tipo_id}>
                                                        {(productoTipoId) => DictamenAdquisicion.productoTipoPuedeRequerirNumeroInventario(productoTipoId) && (
                                                            <form.AppField
                                                                name={`adquisiciones[${index}].numero_inventario`}
                                                                children={() => <ArticuloNullableNumeroInventarioField />}
                                                            />
                                                        )}
                                                    </form.Subscribe>
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

                <form.AppField
                    name="motivo_cambio"
                    children={() => <DictamenMotivoCambioField required />}
                />


                <Button
                    onClick={async () => {
                        form.validateSync('submit');
                        await form.validateAsync('submit');
                        if (!form.state.isValid) return;
                        setShowAlertDialog(true);
                    }}
                    className="self-center max-w-min"
                >
                    <SquarePenIcon /> Guardar edición
                </Button>

                <AlertDialog onOpenChange={setShowAlertDialog} open={showAlertDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                ¿Estás seguro de continuar?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Al continuar, el número de dictamen será actualizado y el documento será regenerado con los cambios realizados.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => form.handleSubmit()} disabled={status === 'pending'}>
                                {status === 'pending' ? (
                                    <>
                                        Actualizando <Spinner />
                                    </>) : (
                                    <>
                                        Continuar <CircleArrowRightIcon />
                                    </>
                                )}
                            </AlertDialogAction>
                            <AlertDialogCancel autoFocus>
                                <CircleXIcon /> Cancelar
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form.AppForm>
        </Form>
    );
}
