import { useAppForm } from "@/components/ui/form-context";
import { adquisicionFieldsDefaultValues, defaultValues, validator, type InventariarDictamenSchema } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form } from "@/components/ui/form";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EsResultadoEsperadoField, ObservacionesField } from "@/components/features/articulos/recepciones/form-fields";
import { ProductoField } from "@/components/features/productos/form-fields";
import { FacturaField } from "@/components/features/facturas/form-fields";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CostoUnitarioField, CuentaContable, EsContableField, NumeroSerieField } from "@/components/features/articulos/form-fields";
import { OrdenCompraField } from "@/components/features/orden_compras/form-fields";
import { inventariarDictamenHasOrdenCompra } from "@/routes/_auth/dictamenes/$uuid/-utils";
import type { OrdenCompra } from "@/types/orden_compras";
import { ShowBienesInformaticosTitle } from "../../partials/show-info";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import type { DetailedInventariarDictamen, InventariarDictamenAdquisicion } from "@/types/dictamenes";
import { ArchivoAttachmentLayout } from "@/components/features/archivos/attachment";
import React from "react";
import { isStringNumber } from "@/lib/utils";
import { AdquisicionIdField } from "./form-fields";
import type { ComboboxOption } from "@/components/ui/creatable-combobox";

export const useForm = (dictamen: DetailedInventariarDictamen) => {
    const { mutate } = useActionFormMutation(dictamen);

    const cleanedDefaultValues: InventariarDictamenSchema = inventariarDictamenHasOrdenCompra(dictamen)
        ? { ...defaultValues, orden_compra_id: dictamen.orden_compra.id }
        : defaultValues;

    return useAppForm({
        defaultValues: cleanedDefaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });
}

function useAdquisicionesOptions(initialValues: InventariarDictamenAdquisicion[]) {
    const initialOptions = React.useMemo(() =>
        initialValues
            .filter((adquisicion) => adquisicion.cantidad_restante > 0)
            .map((adquisicion) => ({
                id: adquisicion.id,
                label: `${adquisicion.producto.tipo.nombre} ${adquisicion.producto.marca.nombre} ${adquisicion.producto.nombre} ${adquisicion.caracteristicas} ― ${adquisicion.empleado?.nombre ?? 'Juan Pérez'}`,
                cantidad_restante: adquisicion.cantidad_restante,
            })),
        [initialValues]);

    const [options, setOptions] = React.useState(initialOptions);

    const availableOptions = React.useMemo(
        () =>
            options
                .filter((o) => o.cantidad_restante > 0)
                .map((o): ComboboxOption => ({ label: o.label, value: `${o.id}` })),
        [options]
    );

    const removeOption = (id: number) => {
        setOptions((prev) =>
            prev.map((o) =>
                o.id === id
                    ? { ...o, cantidad_restante: Math.max(0, o.cantidad_restante - 1) }
                    : o
            )
        );
    };

    const restoreOption = (id: number) => {
        setOptions((prev) =>
            prev.map((o) =>
                o.id === id
                    ? { ...o, cantidad_restante: o.cantidad_restante + 1 }
                    : o
            )
        );
    };

    return { options: availableOptions, removeOption, restoreOption };
}

export function InventariarForm({ dictamen }: { dictamen: DetailedInventariarDictamen }) {
    const form = useForm(dictamen);

    const [ordenCompra, setOrdenCompra] = React.useState<OrdenCompra | undefined>(dictamen.orden_compra ?? undefined);

    const adquisiciones = dictamen.version_actual.adquisiciones;

    const {
        options: adquisicionesOptions,
        removeOption: adquisicionRemoveOptions,
        restoreOption: adquisicionRestoreOptions
    } = useAdquisicionesOptions(adquisiciones);

    let cantidadTotal = 0;
    adquisiciones.forEach(a => cantidadTotal += a.cantidad_restante);

    return (
        <Form form={form}>
            <form.AppForm>
                <div className="max-w-1/3">
                    {inventariarDictamenHasOrdenCompra(dictamen) ? (
                        <Field>
                            <FieldLabel className="font-bold">Orden de Compra</FieldLabel>
                            <ArchivoAttachmentLayout
                                value={dictamen.orden_compra.archivo}
                            />
                        </Field>
                    ) : (
                        <form.AppField
                            name="orden_compra_id"
                            children={() => <OrdenCompraField onValueChange={setOrdenCompra} />}
                            listeners={{
                                onChange: () =>
                                    form.getFieldValue('adquisiciones')
                                        .forEach((_, index) => {
                                            form.setFieldValue(`adquisiciones[${index}].factura_id`, undefined);
                                        })
                            }}
                        />
                    )}
                </div>

                <form.AppField name="adquisiciones" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <ShowBienesInformaticosTitle />
                                <div className="flex flex-row gap-2">
                                    <Button
                                        disabled={field.state.value.length >= cantidadTotal}
                                        onClick={() => {
                                            field.pushValue(adquisicionFieldsDefaultValues);
                                        }}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <PlusCircleIcon /> Registrar
                                    </Button>
                                </div>
                            </div>

                            {field.state.value.map((_, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Bien Informático #{index + 1}</CardTitle>
                                        <CardAction>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    const id = field.state.value[index].id;
                                                    if (id) {
                                                        adquisicionRestoreOptions(id);
                                                    }
                                                    field.removeValue(index);
                                                }}
                                                disabled={field.state.value.length === 1}
                                            >
                                                <Trash2Icon />Eliminar
                                            </Button>
                                        </CardAction>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-7">
                                        <FieldGroup className="grid grid-cols-2">
                                            <form.AppField
                                                name={`adquisiciones[${index}].id`}
                                                children={(field) => (
                                                    <AdquisicionIdField
                                                        options={adquisicionesOptions}
                                                        onValueChange={(v) => {
                                                            const value = v && isStringNumber(v.value) ? Number(v.value) : undefined;
                                                            const previousValue = field.state.value;

                                                            if (previousValue !== undefined && previousValue !== value) {
                                                                adquisicionRestoreOptions(previousValue);
                                                            }

                                                            if (value !== undefined && previousValue !== value) {
                                                                adquisicionRemoveOptions(value);
                                                            }

                                                            field.handleChange(value);
                                                        }}
                                                        required
                                                    />
                                                )}
                                                listeners={{
                                                    onChange: () => {
                                                        form.setFieldValue(`adquisiciones[${index}].es_resultado_esperado`, undefined);
                                                    }
                                                }}
                                            />

                                            <form.Subscribe selector={(state) => state.values.adquisiciones[index].id}>
                                                {(adquisicionId) => (
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].es_resultado_esperado`}
                                                        children={() => <EsResultadoEsperadoField required />}
                                                        listeners={{
                                                            onChange: ({ value }) => {
                                                                form.setFieldValue(`adquisiciones[${index}].observaciones`, null);

                                                                if (value) {
                                                                    const adquisicion = adquisiciones.find(a => a.id === adquisicionId);
                                                                    form.setFieldValue(`adquisiciones[${index}].producto_id`, adquisicion?.producto.id);
                                                                } else {
                                                                    form.setFieldValue(`adquisiciones[${index}].producto_id`, undefined);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </form.Subscribe>
                                        </FieldGroup>

                                        <form.Subscribe
                                            selector={(state) => {
                                                const adquisicionField = state.values.adquisiciones[index];
                                                return {
                                                    esResultadoEsperado: adquisicionField.es_resultado_esperado,
                                                    adquisicionId: adquisicionField.id
                                                };
                                            }}
                                        >
                                            {({esResultadoEsperado, adquisicionId}) => esResultadoEsperado === false && (
                                                <FieldGroup className="flex-row">
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].producto_id`}
                                                        children={() => {
                                                            const adquisicion = adquisiciones.find(a => a.id === adquisicionId);
                                                            return (
                                                                <ProductoField tipo={adquisicion?.producto.tipo.id} required />
                                                            );
                                                        }}
                                                    />
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].observaciones`}
                                                        children={() => <ObservacionesField className="col-span-2" required />}
                                                    />
                                                </FieldGroup>
                                            )}
                                        </form.Subscribe>

                                        <form.AppField
                                            name={`adquisiciones[${index}].cuenta_contable`}
                                            children={() => <CuentaContable required />}
                                        />

                                        <FieldGroup className="flex-row">
                                            <form.AppField
                                                name={`adquisiciones[${index}].numero_serie`}
                                                children={() => <NumeroSerieField required />}
                                            />

                                            <form.AppField
                                                name={`adquisiciones[${index}].es_contable`}
                                                children={() => <EsContableField required />}
                                            />
                                        </FieldGroup>

                                        <FieldGroup className="grid grid-cols-2">
                                            <form.Subscribe selector={(state) => state.values.adquisiciones[index].es_contable}>
                                                {(esContable) => (
                                                    <form.AppField
                                                        name={`adquisiciones[${index}].costo_unitario`}
                                                        children={() => <CostoUnitarioField required={esContable} />}
                                                    />
                                                )}
                                            </form.Subscribe>

                                            <form.AppField
                                                name={`adquisiciones[${index}].factura_id`}
                                                children={() => (
                                                    <FacturaField
                                                        proveedorId={ordenCompra?.proveedor.id}
                                                        disabled={!ordenCompra}
                                                        required
                                                    />
                                                )}
                                            />
                                        </FieldGroup>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </form.AppField>

                <form.SubmitFormButton />
            </form.AppForm>
        </Form >
    );
}
