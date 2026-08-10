import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RecepcionFieldGroup } from "@/views/common/articulos/recepciones/form-fields";
import { Separator } from "@/components/ui/separator";
import { ProductoGroupField } from "@/views/common/productos/form-fields";
import { FacturaField } from "@/views/common/facturas/form-fields";
import { FieldGroup } from "@/components/ui/field";
import { CostoUnitarioField, CuentaContable, EsContableField, NullableNumeroInventarioField, NumeroSerieField } from "@/views/common/articulos/form-fields";
import type { DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { OrdenCompraField } from "@/views/common/orden_compras/form-fields";
import { useStore } from "@tanstack/react-form";
import { adquisicionHasArticulo } from "@/routes/_auth/dictamenes/$uuid/-utils";

export const useForm = (dictamen: DetailedActionDictaminadoDictamen) => {
    const { mutate } = useActionFormMutation(dictamen);

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

export function InventariarForm({ dictamen }: { dictamen: DetailedActionDictaminadoDictamen }) {
    const form = useForm(dictamen);
    const slots = dictamen.version_actual.adquisiciones.flatMap((adquisicion) =>
        Array.from({ length: adquisicion.cantidad }, (_, index) => ({
            adquisicion,
            index,
        }))
    );

    const ordenCompra = useStore(form.store, (state) => state.values.orden_compra_uuid);

    return (
        <Form form={form}>
            <form.AppForm>
                <form.AppField
                    name="orden_compra_uuid"
                    children={() => <OrdenCompraField className="w-1/3" />}
                    listeners={{
                        onChange: () => {
                            const adquisiciones = form.getFieldValue('adquisiciones');
                            console.log(adquisiciones);
                            adquisiciones.forEach((_, index) => {
                                form.setFieldValue(`adquisiciones[${index}].factura_uuid`, undefined);
                            });
                        }
                    }}
                />

                {slots.map((slot, index) => (
                    <form.AppField
                        key={`${slot.adquisicion.id}-${slot.index}`}
                        name="adquisiciones"
                        mode="array"
                        children={() => {
                            const adquisicion = slot.adquisicion;
                            const { producto, } = adquisicion;

                            return (
                                <Card>
                                    <CardContent className="flex flex-col gap-4">
                                        <Label className="font-bold text-base capitalize">Bien Informático #{index + 1}</Label>

                                        <div className="flex flex-col gap-7">
                                            <div className="flex gap-7">
                                                <div data-slot="label-container" className="w-7/10">
                                                    <Label className="font-bold">
                                                        Características solicitadas
                                                    </Label>
                                                    <Label>
                                                        {producto.tipo.nombre} {producto.marca.nombre} {producto.nombre} {adquisicion.caracteristicas}
                                                    </Label>
                                                </div>

                                                <div data-slot="label-container" className="w-3/10">
                                                    <Label className="font-bold">
                                                        Resguardante
                                                    </Label>
                                                    <Label>
                                                        {adquisicion.empleado?.nombre ?? 'Juan Pérez'}
                                                    </Label>
                                                </div>
                                            </div>

                                            <div>
                                                <RecepcionFieldGroup
                                                    form={form}
                                                    fields={{
                                                        observaciones: `adquisiciones[${index}].observaciones`,
                                                        es_resultado_esperado: `adquisiciones[${index}].es_resultado_esperado`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <Separator />
                                    <CardContent className="flex flex-col gap-7">
                                        <ProductoGroupField
                                            form={form}
                                            fields={{
                                                id: `adquisiciones[${index}].producto_id`,
                                                tipo_id: `adquisiciones[${index}].producto_tipo_id`
                                            }}
                                            className="flex-row"
                                        />

                                        <FieldGroup className="flex-row">
                                            <form.AppField
                                                name={`adquisiciones[${index}].numero_serie`}
                                                children={() => <NumeroSerieField className="w-1/2" />}
                                            />

                                            <div className="w-1/2">
                                                {adquisicionHasArticulo(adquisicion) && (
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].numero_inventario`}
                                                        children={() => <NullableNumeroInventarioField />}
                                                    />
                                                )}
                                            </div>
                                        </FieldGroup>

                                        <FieldGroup className="flex-row">
                                            <form.AppField
                                                name={`adquisiciones[${index}].costo_unitario`}
                                                children={() => <CostoUnitarioField />}
                                            />
                                            <form.AppField
                                                name={`adquisiciones[${index}].es_contable`}
                                                children={() => <EsContableField />}
                                            />
                                        </FieldGroup>

                                        <FieldGroup className="flex-row">
                                            <form.AppField
                                                name={`adquisiciones[${index}].cuenta_contable`}
                                                children={() => <CuentaContable />}
                                            />

                                            <form.AppField
                                                name={`adquisiciones[${index}].factura_uuid`}
                                                children={() => (
                                                    <FacturaField
                                                        ordenCompra={ordenCompra}
                                                        disabled={!ordenCompra}
                                                    />
                                                )}
                                            />
                                        </FieldGroup>
                                    </CardContent>
                                </Card>
                            );
                        }}
                    />
                ))}

                <SubmitButton />
            </form.AppForm>
        </Form>
    );
}
