import type { SurtirDictamen } from "@/types/dictamenes";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAppForm } from '@/components/ui/form.shared';
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/corregir";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { FormLayout } from "@/components/ui/form-layout";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { DictamenCantidadField, DictamenCaracteristicasAdicionalesField, DictamenMotivoCambioField } from "../fields";
import { Button } from "@/components/ui/button";
import { CircleArrowRightIcon, CircleXIcon, PlusCircleIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DictamenAdquisicion } from "@/lib/utils";
import { ArticuloNullableNumeroInventarioField } from "@/components/features/articulos/form-fields";
import { useNavigate } from "@tanstack/react-router";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { FieldValue } from "@/components/ui/field-value";
import { Spinner } from "@/components/ui/spinner";
import { ShowOficioInfo } from "../common";
import { BaseFieldLayout } from "@/components/ui/field-layout";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { corregirDictamenDefaultFormValues, corregirDictamenFormValidator, corregirDictamenAdquisicionFieldsDefaultValues } from "./form-schema";
import { ProductoTipoField } from "../../productos/tipo-field";
import { EmpleadoField } from "../../empleados/field";
import { ProductoTipoEnum } from "@/lib/constants";
import { ComputadoraTipoField } from "../../computadoras/tipo-field";
import { CamaraTipoField } from "../../camaras/tipo-field";
import { LicenciaTipoField } from "../../licencias/tipo-field";
import { ProductoVarianteSpecFieldGroup } from "../../productos/variante-spec-field-group";
import { DiscoTipoField } from "../../discos/tipo-field";
import { DiscoCapacidadField } from "../../discos/capacidad-field";
import { DiscoFactorFormaField } from "../../discos/factor-forma-field";
import { DiscoInterfazField } from "../../discos/interfaz-field";
import { RamTipoField } from "../../rams/tipo-field";
import { RamCapacidadField } from "../../rams/capacidad-field";
import { RamVelocidadField } from "../../rams/velocidad-field";
import React from "react";

function useCorregirFormMutation(dictamen: SurtirDictamen) {
    const navigate = useNavigate();

    return useFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/corregir`,
        onSuccess: async (_, __, ___, context) => {
            await context.client.invalidateQueries({ queryKey: ['dictamenes'] });
            await navigate({ to: IndexRoute.to });
        }
    });
}

export const DictamenCorregirForm = () => {
    const { dictamen } = EditarRoute.useRouteContext();

    const { mutate, status } = useCorregirFormMutation(dictamen);

    const form = useAppForm({
        defaultValues: corregirDictamenDefaultFormValues(dictamen),
        validators: {
            onSubmit: corregirDictamenFormValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = corregirDictamenFormValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    const [showAlertDialog, setShowAlertDialog] = React.useState(false);

    return (
        <FormLayout form={form} className="flex flex-col gap-6">
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

                <form.AppField
                    name="motivo_cambio"
                    children={() => <DictamenMotivoCambioField required />}
                />

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => field.pushValue(corregirDictamenAdquisicionFieldsDefaultValues)}
                                >
                                    <PlusCircleIcon /> Agregar
                                </Button>
                            </div>

                            {field.state.value.map((_, index) => (
                                <Card key={index} className="shadow-none">
                                    <CardContent className="flex gap-6">
                                        <div className="flex flex-col gap-6 grow">
                                            <div className="flex flex-row gap-7">
                                                <FieldGroup className="grid grid-cols-2">
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].empleado_id`}
                                                        children={() => (
                                                            <EmpleadoField
                                                                adscripcionId={dictamen.adscripcion.id}
                                                                required
                                                            />
                                                        )}
                                                    />

                                                    <form.Subscribe selector={(state) => state.values.adquisiciones[index].producto_variante.tipo_id}>
                                                        {(productoTipoId) => DictamenAdquisicion.productoTipoPuedeRequerirNumeroInventario(productoTipoId) && (
                                                            <form.AppField
                                                                name={`adquisiciones[${index}].numero_inventario`}
                                                                children={() => <ArticuloNullableNumeroInventarioField />}
                                                            />
                                                        )}
                                                    </form.Subscribe>
                                                </FieldGroup>
                                            </div>

                                            <div className="flex flex-row gap-7 grow">
                                                <form.AppField
                                                    name={`adquisiciones[${index}].cantidad`}
                                                    children={() => <DictamenCantidadField className="max-w-min" />}
                                                />

                                                <div className='flex flex-col gap-7 grow'>
                                                    <FieldGroup className="grid grid-cols-2">
                                                        <form.AppField
                                                            name={`adquisiciones[${index}].producto_variante.tipo_id`}
                                                            children={() => <ProductoTipoField required />}
                                                        />

                                                        <form.Subscribe selector={(state) => state.values.adquisiciones[index].producto_variante.tipo_id}>
                                                            {(productoTipoId) => {
                                                                switch (productoTipoId) {
                                                                    case ProductoTipoEnum.Computadora:
                                                                        return (
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                                children={() => <ComputadoraTipoField layout={{ label: "Tipo de Computadora" }} required />}
                                                                            />
                                                                        );
                                                                    case ProductoTipoEnum.Camara:
                                                                        return (
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                                children={() => <CamaraTipoField layout={{ label: "Tipo de Cámara" }} required />}
                                                                            />
                                                                        );
                                                                    case ProductoTipoEnum.Licencia:
                                                                        return (
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                                children={() => <LicenciaTipoField layout={{ label: "Tipo de Licencia" }} required />}
                                                                            />
                                                                        );
                                                                    default:
                                                                        break;
                                                                }
                                                            }}
                                                        </form.Subscribe>
                                                    </FieldGroup>

                                                    <ProductoVarianteSpecFieldGroup
                                                        form={form}
                                                        fields={{
                                                            marca_id: `adquisiciones[${index}].producto_variante.marca_id`,
                                                            modelo: `adquisiciones[${index}].producto_variante.modelo`,
                                                        }}
                                                        required={{
                                                            marca_id: true,
                                                            modelo: true
                                                        }}
                                                    />

                                                    <form.Subscribe selector={(state) => state.values.adquisiciones[index].producto_variante.tipo_id}>
                                                        {(productoTipoId) => {
                                                            switch (productoTipoId) {
                                                                case ProductoTipoEnum.Disco:
                                                                    return (
                                                                        <FieldGroup className='flex-row'>
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                                children={() => <DiscoTipoField required />}
                                                                            />

                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.capacidad_id`}
                                                                                children={() => <DiscoCapacidadField required />}
                                                                            />

                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.factor_forma_id`}
                                                                                children={() => <DiscoFactorFormaField emptyValue={null} />}
                                                                            />

                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.interfaz_id`}
                                                                                children={() => <DiscoInterfazField emptyValue={null} />}
                                                                            />
                                                                        </FieldGroup>
                                                                    );
                                                                case ProductoTipoEnum.Ram:
                                                                    return (
                                                                        <FieldGroup className='flex-row'>
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                                children={() => <RamTipoField required />}
                                                                            />
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.capacidad_id`}
                                                                                children={() => <RamCapacidadField required />}
                                                                            />
                                                                            <form.AppField
                                                                                name={`adquisiciones[${index}].producto_variante.spec.velocidad_id`}
                                                                                children={() => <RamVelocidadField emptyValue={null} />}
                                                                            />
                                                                        </FieldGroup>
                                                                    );
                                                                default:
                                                                    break;
                                                            }
                                                        }}
                                                    </form.Subscribe>

                                                    <form.AppField
                                                        name={`adquisiciones[${index}].caracteristicas_adicionales`}
                                                        children={() => <DictamenCaracteristicasAdicionalesField />}
                                                    />
                                                </div>
                                            </div>
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
        </FormLayout>
    );
}
