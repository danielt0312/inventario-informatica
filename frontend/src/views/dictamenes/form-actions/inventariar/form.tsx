import type { OrdenCompra } from "@/types/orden_compras";
import type { DetailedInventariarDictamen, InventariarDictamenAdquisicion } from "@/types/dictamenes";
import { useAppForm } from "@/components/ui/form-context";
import { adquisicionFieldsDefaultValues, defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form } from "@/components/ui/form";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductoField } from "@/components/features/productos/form-fields";
import { FacturaField } from "@/components/features/facturas/form-fields";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ArticuloCostoUnitarioField, ArticuloCuentaContable, ArticuloNumeroSerieField, EsResultadoEsperadoField, ObservacionesField } from "@/components/features/articulos/form-fields";
import { OrdenCompraField } from "@/components/features/orden_compras/form-fields";
import { inventariarDictamenHasOrdenCompra } from "@/routes/_auth/dictamenes/$uuid/-utils";
import { ShowBienesInformaticosTitle } from "../../partials/show-info";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, CircleArrowRightIcon, CircleXIcon, PackageCheckIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { ArchivoAttachmentLayout } from "@/components/features/archivos/attachment-layout";
import { esCuentaContableNoInventariable, esCuentaContable, isStringNumber, esCuentaContableInventariable } from "@/lib/utils";
import { AdquisicionIdField } from "./form-fields";
import { toComboboxItems } from "@/components/ui/combobox-layout.shared";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

function useAdquisicionesOptions(initialValues: InventariarDictamenAdquisicion[]) {
    const initialOptions = React.useMemo(() =>
        initialValues
            .filter((adquisicion) => adquisicion.cantidad_restante > 0)
            .map((adquisicion) => ({
                id: adquisicion.id,
                label: `${adquisicion.producto.tipo.nombre} ${adquisicion.producto.marca.nombre} ${adquisicion.producto.nombre} ${adquisicion.especificaciones_tecnicas} ― ${adquisicion.empleado?.nombre ?? 'Juan Pérez'}`,
                cantidad_restante: adquisicion.cantidad_restante,
            })),
        [initialValues]);

    const [options, setOptions] = React.useState(initialOptions);

    const availableOptions = React.useMemo(() => {
        const filtered = options.filter((o) => o.cantidad_restante > 0);
        return toComboboxItems(filtered, (item) => ({
            label: item.label,
            value: item.id
        }))
    }, [options]);

    const allOptions = React.useMemo(
        () => toComboboxItems(options, (item) => ({ label: item.label, value: item.id })),
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

    return { options: allOptions, availableOptions, removeOption, restoreOption };
}

export function InventariarForm({ dictamen }: { dictamen: DetailedInventariarDictamen }) {
    const { mutate, status } = useActionFormMutation(dictamen);

    const cleanedDefaultValues = inventariarDictamenHasOrdenCompra(dictamen)
        ? { ...defaultValues, orden_compra_id: dictamen.orden_compra.id }
        : defaultValues;

    const form = useAppForm({
        defaultValues: cleanedDefaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });

    const [ordenCompra, setOrdenCompra] = React.useState<OrdenCompra | undefined>(dictamen.orden_compra ?? undefined);
    const [open, setOpen] = React.useState(false);

    const adquisiciones = dictamen.version_actual.adquisiciones;

    const {
        options: adquisicionesOptions,
        availableOptions: adquisicionesAvailableOptions,
        removeOption: adquisicionRemoveOptions,
        restoreOption: adquisicionRestoreOptions
    } = useAdquisicionesOptions(adquisiciones);

    let cantidadTotal = 0;
    adquisiciones.forEach(a => cantidadTotal += a.cantidad_restante);

    return (
        <>
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

                                {field.state.value.map((_, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="flex flex-row gap-2">
                                                <div className="text-lg">
                                                    Bien Informático #{index + 1}
                                                </div>
                                                <form.Subscribe selector={state => state.values.adquisiciones[index].cuenta_contable}>
                                                    {(cuentaContable) => !!cuentaContable && esCuentaContable(cuentaContable) && (
                                                        <Badge className="[&>svg]:size-4.5 font-bold text-foreground bg-green-500">
                                                            <BadgeCheckIcon />
                                                            {esCuentaContableNoInventariable(cuentaContable) ? 'No Inventariable' : 'Inventariable'}
                                                        </Badge>
                                                    )}
                                                </form.Subscribe>
                                            </CardTitle>
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
                                                            items={adquisicionesOptions}
                                                            availableItems={adquisicionesAvailableOptions}
                                                            onFieldValueChange={(item) => {
                                                                const itemValue = item?.value;
                                                                const value = itemValue === undefined
                                                                    ? itemValue
                                                                    : (typeof itemValue === 'string' && !isStringNumber(itemValue))
                                                                        ? undefined
                                                                        : Number(itemValue);
                                                                const previousValue = field.state.value;

                                                                if (previousValue !== undefined && previousValue !== value) {
                                                                    adquisicionRestoreOptions(previousValue);
                                                                }

                                                                if (value !== undefined && previousValue !== value) {
                                                                    adquisicionRemoveOptions(value);
                                                                }

                                                                return value;
                                                            }}
                                                        />
                                                    )}
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
                                                {({ esResultadoEsperado, adquisicionId }) => esResultadoEsperado === false && (
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

                                            <FieldGroup className="flex-row">
                                                <form.AppField
                                                    name={`adquisiciones[${index}].cuenta_contable`}
                                                    children={() => <ArticuloCuentaContable required />}
                                                    listeners={{
                                                        onChange: ({ value }) => {
                                                            if (value !== undefined && esCuentaContableNoInventariable(value)) {
                                                                form.validateField(`adquisiciones[${index}].costo_unitario`, 'change')
                                                            }
                                                        }
                                                    }}
                                                />

                                                <form.Subscribe selector={(state) => state.values.adquisiciones[index].cuenta_contable}>
                                                    {(cuentaContable) => (
                                                        <form.AppField
                                                            name={`adquisiciones[${index}].costo_unitario`}
                                                            children={() => (
                                                                <ArticuloCostoUnitarioField
                                                                    required={
                                                                        !!cuentaContable &&
                                                                        esCuentaContableInventariable(cuentaContable)
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                </form.Subscribe>
                                            </FieldGroup>

                                            <FieldGroup className="grid grid-cols-2">
                                                <form.AppField
                                                    name={`adquisiciones[${index}].numero_serie`}
                                                    children={() => <ArticuloNumeroSerieField required />}
                                                />

                                                <form.AppField
                                                    name={`adquisiciones[${index}].factura_id`}
                                                    children={() => (
                                                        <FacturaField
                                                            proveedorId={ordenCompra?.proveedor.id}
                                                            disabled={!ordenCompra}
                                                            fieldLayout={{ required: true }}
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

                    <Button
                        className="self-center"
                        onClick={async () => {
                            form.validateSync('submit');
                            await form.validateAsync('submit');
                            if (!form.state.isValid) return;
                            setOpen(true);
                        }}
                    >
                        <PackageCheckIcon /> Ingresar artículos
                    </Button>
                </form.AppForm>
            </Form>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Deseas continuar?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        Los bienes informáticos serán ingresados al inventario actual, verifica que la información sea correcta antes de continuar.
                    </AlertDialogDescription>

                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={async () => {
                                await form.handleSubmit();
                                setOpen(false);
                            }}
                            disabled={status === 'pending'}
                        >
                            {status === 'pending' ? (
                                <><Spinner /> Ingresando</>
                            ) : (
                                <>Ingresar <CircleArrowRightIcon /></>
                            )}
                        </AlertDialogAction>
                        <AlertDialogCancel>
                            <CircleXIcon /> Cancelar
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
