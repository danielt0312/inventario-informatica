import { useAppForm } from "@/components/ui/form-context";
import { adquisicionFieldsDefaultValues, defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form } from "@/components/ui/form";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RecepcionFieldGroup } from "@/components/features/articulos/recepciones/form-fields";
import { Separator } from "@/components/ui/separator";
import { ProductoGroupField } from "@/components/features/productos/form-fields";
import { FacturaField } from "@/components/features/facturas/form-fields";
import { Field, FieldGroup } from "@/components/ui/field";
import { CostoUnitarioField, CuentaContable, EsContableField, NullableNumeroInventarioField, NumeroSerieField } from "@/components/features/articulos/form-fields";
import { OrdenCompraField } from "@/components/features/orden_compras/form-fields";
import { adquisicionHasArticulo } from "@/routes/_auth/dictamenes/$uuid/-utils";
import type { DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import React from "react";
import type { OrdenCompra } from "@/types/orden_compras";
import { ShowBienesInformaticosTitle } from "../../partials/show-info";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, QrCodeIcon, ScanQrCodeIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { CreatableComboboxField } from "@/components/ui/creatable-combobox-field";
import { FieldLayout } from "@/components/ui/field-layout";
import { CreatableCombobox } from "@/components/ui/creatable-combobox";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Input as A } from "@/components/ui/input-field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScannerButton } from "@/components/ui/scanner-button";

export const useForm = (dictamen: DetailedActionDictaminadoDictamen) => {
    const { mutate } = useActionFormMutation(dictamen);

    return useAppForm({
        defaultValues: defaultValues,
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

    const [ordenCompra, setOrdenCompra] = React.useState<OrdenCompra | undefined>(undefined);

    return (
        <Form form={form}>
            <form.AppForm>
                <form.AppField
                    name="orden_compra_id"
                    children={() => <OrdenCompraField className="w-1/3" onValueChange={setOrdenCompra} />}
                    listeners={{
                        onChange: () => {
                            const adquisiciones = form.getFieldValue('adquisiciones');
                            adquisiciones.forEach((_, index) => {
                                form.setFieldValue(`adquisiciones[${index}].factura_id`, undefined);
                            });
                        }
                    }}
                />

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <ShowBienesInformaticosTitle />
                                <div className="flex flex-row gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                    >
                                        <ScanQrCodeIcon /> Escanear cuentas contables
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            field.pushValue(adquisicionFieldsDefaultValues)
                                        }}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <PlusCircleIcon /> Registrar manualmente
                                    </Button>
                                </div>
                            </div>

                            {field.state.value.map((adquisicionField, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Bien Informático #{index + 1}</CardTitle>
                                        <CardAction>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => field.removeValue(index)}
                                                disabled={field.state.value.length === 1}
                                            >
                                                <Trash2Icon />Eliminar
                                            </Button>
                                        </CardAction>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-7">
                                            <div className="flex gap-7">
                                                <FieldLayout label="Características solicitadas">
                                                    <CreatableCombobox options={[]} />
                                                </FieldLayout>

                                                <div data-slot="label-container" className="w-3/10">
                                                    <Label className="font-bold">
                                                        Resguardante
                                                    </Label>
                                                    <Label>
                                                        {/* {adquisicion.empleado?.nombre ?? 'Juan Pérez'} */}
                                                    </Label>
                                                </div>
                                            </div>

                                            <ScannerButton />

                                            <form.AppField
                                                name={`adquisiciones[${index}].cuenta_contable`}
                                                children={() => <CuentaContable />}
                                            />

                                            <RecepcionFieldGroup
                                                form={form}
                                                fields={{
                                                    observaciones: `adquisiciones[${index}].observaciones`,
                                                    es_resultado_esperado: `adquisiciones[${index}].es_resultado_esperado`
                                                }}
                                            />
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

                                            {/* <div className="w-1/2">
                                            {adquisicionHasArticulo(adquisicion) && (
                                                <form.AppField
                                                    name={`adquisiciones[${index}].numero_inventario`}
                                                    children={() => <NullableNumeroInventarioField />}
                                                />
                                            )}
                                        </div> */}
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

                                        <form.AppField
                                            name={`adquisiciones[${index}].factura_id`}
                                            children={() => (
                                                <FacturaField
                                                    proveedorId={ordenCompra?.proveedor.id}
                                                    disabled={!ordenCompra}
                                                />
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </form.AppField>

                <form.SubmitFormButton />
            </form.AppForm>
        </Form>
    );
}
