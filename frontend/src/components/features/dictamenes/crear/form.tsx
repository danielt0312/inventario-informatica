import { useAppForm } from '@/components/ui/form.shared';
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { crearDictamenFormDefaultValues, crearDictamenAdquisicionFieldsDefaultFormValues, crearDictamenFormValidator } from "./form-schema";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Card, CardContent } from "@/components/ui/card";
import { DictamenOficioArchivoField, DictamenCantidadField, DictamenFechaSolicitudField, DictamenFolioField, DictamenCaracteristicasAdicionalesField } from "../fields";
import { AdscripcionField } from "@/components/features/adscripciones/field";
import { EmpleadoField } from '@/components/features/empleados/field';
import { FormLayout } from "@/components/ui/form-layout";
import { ProductoTipoField } from '@/components/features/productos/tipo-field';
import { ArticuloNullableNumeroInventarioField } from "@/components/features/articulos/form-fields";
import { DictamenAdquisicion } from "@/lib/utils";
import { Label } from '@/components/ui/label';
import { ProductoVarianteSpecFieldGroup } from '../../productos/variante-spec-field-group';
import { ProductoTipoEnum } from '@/lib/constants';
import { DiscoFieldsGroup } from '../../discos/field';

function Form() {
    const { mutate } = useFormMutation({
        url: 'api/dictamenes',
        onSuccess: async (_, __, ___, context) => {
            await context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            await navigate({ to: IndexRoute.to });
        }
    });

    const navigate = useNavigate();

    const form = useAppForm({
        defaultValues: crearDictamenFormDefaultValues,
        validators: {
            onSubmit: crearDictamenFormValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = crearDictamenFormValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    return (
        <FormLayout form={form} className="flex flex-col gap-6">
            <form.AppForm>
                <FieldGroup className="flex-row">
                    <form.AppField
                        name="fecha_solicitud"
                        children={() => <DictamenFechaSolicitudField />}
                    />
                    <form.AppField
                        name="adscripcion_id"
                        children={() => <AdscripcionField layout={{ label: "Área de Adscripción solicitante" }} required emptyValue={undefined} />}
                    />
                    <form.AppField
                        name="folio"
                        children={() => <DictamenFolioField />}
                    />
                </FieldGroup>

                <form.AppField
                    name="archivo_uuid"
                    children={() => <DictamenOficioArchivoField className="md:max-w-1/2" />}
                />

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => field.pushValue(crearDictamenAdquisicionFieldsDefaultFormValues)}
                                >
                                    <PlusCircleIcon /> Agregar
                                </Button>
                            </div>

                            {field.state.value.map((_, index) => (
                                <Card key={index} className='shadow-none'>
                                    <CardContent className="flex gap-7 items-center">
                                        <div className="flex flex-col gap-7 grow">
                                            <FieldGroup className="grid grid-cols-2">
                                                <form.Subscribe selector={(state) => state.values.adscripcion_id}>
                                                    {adscripcionId => (
                                                        <form.AppField
                                                            name={`adquisiciones[${index}].empleado_id`}
                                                            children={() => (
                                                                <EmpleadoField
                                                                    adscripcionId={adscripcionId}
                                                                    disabled={adscripcionId === undefined}
                                                                    required
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                </form.Subscribe>
                                            </FieldGroup>

                                            <div className="flex flex-row gap-7">
                                                <form.AppField
                                                    name={`adquisiciones[${index}].cantidad`}
                                                    children={() => <DictamenCantidadField className="max-w-min" />}
                                                />

                                                <div className='flex flex-col gap-7 grow'>
                                                    <FieldGroup className="flex-row">
                                                        <form.AppField
                                                            name={`adquisiciones[${index}].borrador.producto.tipo_id`}
                                                            children={() => <ProductoTipoField required className='w-1/2' />}
                                                        />

                                                        <div className="w-1/2">
                                                            <form.Subscribe selector={(state) => state.values.adquisiciones[index].borrador.producto?.tipo_id}>
                                                                {(productoTipoId) => DictamenAdquisicion.productoTipoPuedeRequerirNumeroInventario(productoTipoId) && (
                                                                    <form.AppField
                                                                        name={`adquisiciones[${index}].numero_inventario`}
                                                                        children={() => <ArticuloNullableNumeroInventarioField />}
                                                                    />
                                                                )}
                                                            </form.Subscribe>
                                                        </div>
                                                    </FieldGroup>

                                                    <ProductoVarianteSpecFieldGroup
                                                        form={form}
                                                        fields={{
                                                            marca_id: `adquisiciones[${index}].borrador.producto.marca_id`,
                                                            modelo: `adquisiciones[${index}].borrador.producto.modelo`,
                                                        }}
                                                    />

                                                    <form.Subscribe selector={(state) => state.values.adquisiciones[index].borrador.producto.tipo_id}>
                                                        {(productoTipoId) => {
                                                            switch (productoTipoId) {
                                                                case ProductoTipoEnum.Disco:
                                                                    return (
                                                                        <DiscoFieldsGroup
                                                                            form={form}
                                                                            fields={{
                                                                                tipo_id: `adquisiciones[${index}].borrador.spec.tipo_id`,
                                                                                capacidad_id: `adquisiciones[${index}].borrador.spec.capacidad_id`,
                                                                                interfaz_id: `adquisiciones[${index}].borrador.spec.interfaz_id`,
                                                                                factor_forma_id: `adquisiciones[${index}].borrador.spec.factor_forma_id`,
                                                                            }}
                                                                        />
                                                                    )
                                                                default:
                                                                    break;
                                                            }
                                                        }}
                                                    </form.Subscribe>

                                                    <form.AppField
                                                        name={`adquisiciones[${index}].borrador.caracteristicas_adicionales`}
                                                        children={() => <DictamenCaracteristicasAdicionalesField />}
                                                    />
                                                </div>
                                            </div>
                                        </div>

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
        </FormLayout >
    );
}

export { Form as CrearDictamenForm }
