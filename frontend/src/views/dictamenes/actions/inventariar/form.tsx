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
import { CuentaContable } from "./form-fields";
import { CostoUnitarioField, EsContableField, NumeroSerieField } from "@/views/common/articulos/form-fields";
import type { DetailedActionDictaminado as DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

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
        Array.from({ length: adquisicion.cantidad }, (_, i) => ({
            adquisicion,
            index: i,
        }))
    );

    return (
        <Form form={form}>
            <form.AppForm>
                {slots.map((slot, index) => (
                    <form.AppField
                        key={`${slot.adquisicion.id}-${slot.index}`}
                        name="adquisiciones"
                        mode="array"
                        children={() => {
                            const { producto, ...adquisicion } = slot.adquisicion;

                            return (
                                <Card>
                                    <CardContent className="flex flex-col gap-4">
                                        <Label className="font-bold text-base capitalize">Bien Informático #{index + 1}</Label>

                                        <div className="flex flex-col gap-7">
                                            <div className="flex gap-7">
                                                <div data-slot="label" className="w-7/10">
                                                    <Label className="font-bold">
                                                        Características solicitadas
                                                    </Label>
                                                    <Label>
                                                        {producto.tipo.nombre} {producto.marca.nombre} {producto.nombre} {adquisicion.caracteristicas}
                                                    </Label>
                                                </div>

                                                <div data-slot="label" className="w-3/10">
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
                                                children={() => <NumeroSerieField />}
                                            />
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
                                                children={() => <FacturaField />}
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
