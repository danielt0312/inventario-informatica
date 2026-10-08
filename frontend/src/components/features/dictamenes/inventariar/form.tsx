import type { OrdenCompra } from "@/types/orden_compras";
import type { DetailedPorInventariarDictamen } from "@/types/dictamenes";
import { useAppForm } from '@/components/ui/form.shared';
import { inventariarDictamenArticuloFieldsDefaultValues, inventariarDictamenFormDefaultValues, inventariarDictamenFormValidator } from "./form-schema";
import { FormLayout } from "@/components/ui/form-layout";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FacturaField } from "@/components/features/facturas/form-fields";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ArticuloCostoUnitarioField, ArticuloCuentaContable, ArticuloNumeroSerieField, EsResultadoEsperadoField, ObservacionesField } from "@/components/features/articulos/form-fields";
import { OrdenCompraField } from "@/components/features/orden_compras/form-fields";
import { inventariarDictamenHasOrdenCompra } from "@/components/features/dictamenes/guards";
import { Button } from "@/components/ui/button";
import { CircleArrowRightIcon, CircleXIcon, PackageCheckIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { ArchivoAttachmentLayout } from "@/components/features/archivos/attachment-layout";
import { esCuentaContableNoInventariable, esCuentaContable, esCuentaContableInventariable } from "@/lib/utils";
import { DictamenAdquisicionField, useDictamenAdquisicionComboboxItems } from "./fields";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useDictamenFormActionMutation } from "../form-action/view";
import { Label } from "@/components/ui/label";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ProductoTipoField } from "../../productos/tipo-field";
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
import { DictamenCaracteristicasAdicionalesField } from "../fields";
import { corregirDictamenProductoVarianteToFieldsValue } from "../corregir/form-schema";
import { ArticuloInventariabilidadBadge } from "../../articulos/table-cols";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@tanstack/react-form";

function Form({ dictamen }: { dictamen: DetailedPorInventariarDictamen }) {
    const { mutate, isPending } = useDictamenFormActionMutation(dictamen);

    const derivedDefaultValues = inventariarDictamenHasOrdenCompra(dictamen)
        ? { ...inventariarDictamenFormDefaultValues, orden_compra_id: dictamen.orden_compra.id }
        : inventariarDictamenFormDefaultValues;

    const form = useAppForm({
        defaultValues: derivedDefaultValues,
        validators: {
            onSubmit: inventariarDictamenFormValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = inventariarDictamenFormValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    const [ordenCompra, setOrdenCompra] = React.useState<OrdenCompra | undefined>(dictamen.orden_compra ?? undefined);
    const [open, setOpen] = React.useState(false);

    const adquisiciones = dictamen.version_actual.adquisiciones;

    const {
        allItems: adquisicionesAllItems,
        availableItems: adquisicionesAvailableItems,
        removeItem: adquisicionesRemoveItem,
        restoreItem: adquisicionesRestoreItem
    } = useDictamenAdquisicionComboboxItems(adquisiciones);

    let cantidadTotal = 0;
    adquisiciones.forEach(a => cantidadTotal += a.cantidad_restante);

    const cantidadRegistrados = useStore(form.store, (state) => state.values.articulos.filter((articuloField) => articuloField.dictamen_adquisicion_id !== undefined).length)

    return (
        <>
            <FormLayout form={form}>
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
                                children={() => <OrdenCompraField onValueChange={setOrdenCompra} fieldLayout={{ required: true }} />}
                                listeners={{
                                    onChange: () =>
                                        form.getFieldValue('articulos')
                                            .forEach((_, index) => {
                                                form.setFieldValue(`articulos[${index}].factura_id`, undefined);
                                            })
                                }}
                            />
                        )}
                    </div>

                    <form.AppField name="articulos" mode="array">
                        {(field) => (
                            <>
                                <div className="sticky top-0 z-50 flex flex-row justify-between bg-white pt-6 pb-2 -mt-6 -mb-2">
                                    <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
                                    <div className="flex flex-row items-center gap-2">
                                        <Badge variant="secondary">
                                            {`Total de Registros: ${cantidadRegistrados}/${cantidadTotal}`}
                                        </Badge>

                                        <Button
                                            disabled={field.state.value.length >= cantidadTotal}
                                            onClick={() => field.pushValue(inventariarDictamenArticuloFieldsDefaultValues)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <PlusCircleIcon /> Añadir
                                        </Button>
                                    </div>
                                </div>

                                {field.state.value.map((_, index) => (
                                    <Card key={index} className="shadow-none">
                                        <CardHeader>
                                            <CardTitle className="flex flex-row gap-2">
                                                <div className="text-lg">
                                                    Bien Informático #{index + 1}
                                                </div>
                                                <form.Subscribe selector={state => state.values.articulos[index].cuenta_contable}>
                                                    {(cuentaContable) => !!cuentaContable && esCuentaContable(cuentaContable) && (
                                                        <ArticuloInventariabilidadBadge
                                                            className="[&>svg]:size-4.5 font-bold"
                                                            variant={esCuentaContableInventariable(cuentaContable) ? 'inventariable' : 'no-inventariable'}
                                                        />
                                                    )}
                                                </form.Subscribe>
                                            </CardTitle>
                                            <CardAction>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        const dictamenAdquisicionId = field.state.value[index].dictamen_adquisicion_id;
                                                        if (dictamenAdquisicionId) {
                                                            adquisicionesRestoreItem(dictamenAdquisicionId);
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
                                                    name={`articulos[${index}].dictamen_adquisicion_id`}
                                                    children={(field) => (
                                                        <DictamenAdquisicionField
                                                            items={adquisicionesAllItems}
                                                            renderItem={({ cantidad_restante, label }) => (
                                                                <span>
                                                                    {cantidad_restante > 1 && (
                                                                        <Badge className="rounded-full mr-1" variant="secondary">{`Restantes: ${cantidad_restante}`}</Badge>
                                                                    )}
                                                                    {label}
                                                                </span>
                                                            )}
                                                            availableItems={adquisicionesAvailableItems}
                                                            onFieldValueChange={(item) => {
                                                                const value = item?.value;
                                                                const previousValue = field.state.value;

                                                                if (previousValue !== undefined && previousValue !== value) {
                                                                    adquisicionesRestoreItem(previousValue);
                                                                }

                                                                if (value !== undefined && previousValue !== value) {
                                                                    adquisicionesRemoveItem(value);
                                                                }

                                                                const adquisicion = dictamen.version_actual.adquisiciones.find(
                                                                    adquisicion => adquisicion.id === value
                                                                );

                                                                if (adquisicion) {
                                                                    form.setFieldValue(`articulos[${index}].producto_variante`, corregirDictamenProductoVarianteToFieldsValue(adquisicion.producto_variante));
                                                                }

                                                                return value;
                                                            }}
                                                        />
                                                    )}
                                                />

                                                <form.AppField
                                                    name={`articulos[${index}].es_resultado_esperado`}
                                                    children={() => <EsResultadoEsperadoField required />}
                                                    listeners={{
                                                        onChange: () => {
                                                            form.setFieldValue(`articulos[${index}].observaciones`, null);
                                                        }
                                                    }}
                                                />
                                            </FieldGroup>

                                            <form.Subscribe
                                                selector={(state) => (state.values.articulos[index].es_resultado_esperado)}
                                            >
                                                {(esResultadoEsperado) => esResultadoEsperado === false && (
                                                    <>
                                                        <form.AppField
                                                            name={`articulos[${index}].observaciones`}
                                                            children={() => <ObservacionesField className="col-span-2" required />}
                                                        />

                                                        <div className='flex flex-col gap-7 grow'>
                                                            <FieldGroup className="grid grid-cols-2">
                                                                <form.AppField
                                                                    name={`articulos[${index}].producto_variante.tipo_id`}
                                                                    children={() => <ProductoTipoField required />}
                                                                />

                                                                <form.Subscribe selector={(state) => state.values.articulos[index].producto_variante?.tipo_id}>
                                                                    {(productoTipoId) => {
                                                                        switch (productoTipoId) {
                                                                            case ProductoTipoEnum.Computadora:
                                                                                return (
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.tipo_id`}
                                                                                        children={() => <ComputadoraTipoField layout={{ label: "Tipo de Computadora" }} required />}
                                                                                    />
                                                                                );
                                                                            case ProductoTipoEnum.Camara:
                                                                                return (
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.tipo_id`}
                                                                                        children={() => <CamaraTipoField layout={{ label: "Tipo de Cámara" }} required />}
                                                                                    />
                                                                                );
                                                                            case ProductoTipoEnum.Licencia:
                                                                                return (
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.tipo_id`}
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
                                                                    marca_id: `articulos[${index}].producto_variante.marca_id`,
                                                                    modelo: `articulos[${index}].producto_variante.modelo`,
                                                                }}
                                                                required={{
                                                                    marca_id: true,
                                                                    modelo: true
                                                                }}
                                                            />

                                                            <form.Subscribe selector={(state) => state.values.articulos[index].producto_variante?.tipo_id}>
                                                                {(productoTipoId) => {
                                                                    switch (productoTipoId) {
                                                                        case ProductoTipoEnum.Disco:
                                                                            return (
                                                                                <FieldGroup className='flex-row'>
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.tipo_id`}
                                                                                        children={() => <DiscoTipoField required />}
                                                                                    />

                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.capacidad_id`}
                                                                                        children={() => <DiscoCapacidadField required />}
                                                                                    />

                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.factor_forma_id`}
                                                                                        children={() => <DiscoFactorFormaField emptyValue={null} />}
                                                                                    />

                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.interfaz_id`}
                                                                                        children={() => <DiscoInterfazField emptyValue={null} />}
                                                                                    />
                                                                                </FieldGroup>
                                                                            );
                                                                        case ProductoTipoEnum.Ram:
                                                                            return (
                                                                                <FieldGroup className='flex-row'>
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.tipo_id`}
                                                                                        children={() => <RamTipoField required />}
                                                                                    />
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.capacidad_id`}
                                                                                        children={() => <RamCapacidadField required />}
                                                                                    />
                                                                                    <form.AppField
                                                                                        name={`articulos[${index}].producto_variante.spec.velocidad_id`}
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
                                                                name={`articulos[${index}].caracteristicas_adicionales`}
                                                                children={() => <DictamenCaracteristicasAdicionalesField />}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </form.Subscribe>
                                        </CardContent>

                                        <Separator />

                                        <CardContent className="flex flex-col gap-7">
                                            <FieldGroup className="flex-row">
                                                <form.AppField
                                                    name={`articulos[${index}].cuenta_contable`}
                                                    children={() => <ArticuloCuentaContable required />}
                                                    listeners={{
                                                        onChange: ({ value }) => {
                                                            if (value !== undefined && esCuentaContableNoInventariable(value)) {
                                                                form.validateField(`articulos[${index}].costo_unitario`, 'change')
                                                            }
                                                        }
                                                    }}
                                                />

                                                <form.Subscribe selector={(state) => state.values.articulos[index].cuenta_contable}>
                                                    {(cuentaContable) => (
                                                        <form.AppField
                                                            name={`articulos[${index}].costo_unitario`}
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
                                                    name={`articulos[${index}].numero_serie`}
                                                    children={() => <ArticuloNumeroSerieField />}
                                                />

                                                <form.AppField
                                                    name={`articulos[${index}].factura_id`}
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
            </FormLayout>

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
                            disabled={isPending}
                        >
                            {isPending ? (
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

export {
    Form as InventariarDictamenForm
}
