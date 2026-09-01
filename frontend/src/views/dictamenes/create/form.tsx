import { useAppForm } from "@/components/ui/form-context";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { createDictamenFormDefaultValues, createDictamenFormAdquisicionFieldsDefaultValues, createDictamenFormValidator } from "./form-schema";
import { useStore } from "@tanstack/react-form";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Card, CardContent } from "@/components/ui/card";
import { OficioArchivoField, CantidadField, FechaSolicitudField, FolioField } from "../partials/form-fields";
import { AdscripcionField } from "@/components/features/externos/adscripciones/form-fields";
import { EmpleadoField } from "@/components/features/externos/empleados/form-fields";
import { Form as PrimitiveForm } from "@/components/ui/form";
import { ProductoTipoField } from "@/components/features/productos/tipos/form-fields";
import { ArticuloNullableNumeroInventarioField } from "@/components/features/articulos/form-fields";
import { DictamenAdquisicion } from "@/lib/utils";
import { ShowBienesInformaticosTitle } from "../partials/show-info";

function useCreateFormMutation() {
    const navigate = useNavigate();

    return useFormMutation({
        url: 'api/dictamenes',
        onSuccess: async (_, __, ___, context) => {
            await context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            await navigate({ to: IndexRoute.to });
        }
    });
}

function useForm() {
    const { mutate } = useCreateFormMutation();

    return useAppForm({
        defaultValues: createDictamenFormDefaultValues,
        validators: {
            onSubmit: createDictamenFormValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = createDictamenFormValidator.parse(value);
            mutate({ data, formApi });
        }
    });
}

function Form() {
    const form = useForm();
    const adscripcion = useStore(form.store, (state) => state.values.adscripcion_id);

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
                        children={() => <AdscripcionField layout={{ label: "Área de Adscripción solicitante" }} required />}
                    />
                    <form.AppField
                        name="folio"
                        children={() => <FolioField />}
                    />
                </FieldGroup>

                <form.AppField
                    name="archivo_uuid"
                    children={() => <OficioArchivoField className="md:max-w-1/2" />}
                />

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <ShowBienesInformaticosTitle />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => field.pushValue(createDictamenFormAdquisicionFieldsDefaultValues)}
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
                                                children={() => <ProductoTipoField required />}
                                            />

                                            <form.Subscribe selector={(state) => state.values.adquisiciones[index].producto_tipo_id}>
                                                {(productoTipoId) => DictamenAdquisicion.productoTipoPuedeRequerirNumeroInventario(productoTipoId) && (
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].numero_inventario`}
                                                        children={() => <ArticuloNullableNumeroInventarioField />}
                                                    />
                                                )}
                                            </form.Subscribe>
                                        </FieldGroup>

                                        <form.AppField
                                            name={`adquisiciones[${index}].empleado_id`}
                                            children={() => (
                                                <EmpleadoField
                                                    adscripcionId={adscripcion}
                                                    disabled={adscripcion === undefined}
                                                    required
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

                <form.SubmitFormButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}

export { Form as CreateDictamenForm }
