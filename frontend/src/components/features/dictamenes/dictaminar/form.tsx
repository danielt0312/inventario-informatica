import type { DetailedPorDictaminarDictamen } from "@/types/dictamenes";
import { useAppForm } from '@/components/ui/form.shared';
import { dictaminarDictamenDefaultFormValues, dictaminarDictamenFormValidator } from "./form-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FormLayout } from "@/components/ui/form-layout";
import { useDictamenFormActionMutation } from '../form-action/view';
import { FieldError, FieldGroup } from '@/components/ui/field';
import { FieldValue } from '@/components/ui/field-value';
import { ProductoTipoField } from '../../productos/tipo-field';
import { ProductoTipoSpec } from '@/lib/constants';
import { ComputadoraTipoField } from '../../computadoras/tipo-field';
import { CamaraTipoField } from '../../camaras/tipo-field';
import { LicenciaTipoField } from '../../licencias/tipo-field';
import { ProductoVarianteSpecFieldGroup } from '../../productos/variante-spec-field-group';
import { DiscoTipoField } from '../../discos/tipo-field';
import { DiscoCapacidadField } from '../../discos/capacidad-field';
import { DiscoFactorFormaField } from '../../discos/factor-forma-field';
import { DiscoInterfazField } from '../../discos/interfaz-field';
import { RamTipoField } from '../../rams/tipo-field';
import { RamCapacidadField } from '../../rams/capacidad-field';
import { RamVelocidadField } from '../../rams/velocidad-field';
import { DictamenCaracteristicasAdicionalesField } from '../fields';
import { EmptyValue } from "@/components/ui/empty-value";
import { ProcesadorFrecuenciaMaximaGhzField, ProcesadorHilosField, ProcesadorNucleoField } from "../../procesadores/fields";

function Form({ dictamen }: { dictamen: DetailedPorDictaminarDictamen }) {
    const { mutate } = useDictamenFormActionMutation(dictamen);

    const form = useAppForm({
        defaultValues: dictaminarDictamenDefaultFormValues(dictamen),
        validators: {
            onSubmit: dictaminarDictamenFormValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = dictaminarDictamenFormValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    return (
        <>
            <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>

            <FormLayout form={form} className="flex flex-col gap-6">
                <form.AppForm>
                    <form.AppField name="adquisiciones" mode="array">
                        {(field) => field.state.value.map((_, index) => (
                            <div key={index} className="contents">
                                <Card className='shadow-none'>
                                    <CardContent className="flex flex-col gap-7">
                                        <FieldGroup className="flex-row">
                                            <FieldValue
                                                label="Resguardante"
                                                children={dictamen.version_actual.adquisiciones[index].empleado?.nombre ?? 'Juan Pérez'}
                                            />

                                            <FieldValue
                                                label="Número de Inventario"
                                                children={dictamen.version_actual.adquisiciones[index].articulo?.numero_inventario ?? <EmptyValue />}
                                            />
                                        </FieldGroup>

                                        <div className="flex flex-row gap-7 grow">
                                            <FieldValue
                                                label="Cantidad"
                                                children={dictamen.version_actual.adquisiciones[index].cantidad}
                                                className="max-w-min"
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
                                                                case ProductoTipoSpec.Computadora:
                                                                    return (
                                                                        <form.AppField
                                                                            name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                            children={() => <ComputadoraTipoField layout={{ label: "Tipo de Computadora" }} required />}
                                                                        />
                                                                    );
                                                                case ProductoTipoSpec.Camara:
                                                                    return (
                                                                        <form.AppField
                                                                            name={`adquisiciones[${index}].producto_variante.spec.tipo_id`}
                                                                            children={() => <CamaraTipoField layout={{ label: "Tipo de Cámara" }} required />}
                                                                        />
                                                                    );
                                                                case ProductoTipoSpec.Licencia:
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
                                                            case ProductoTipoSpec.Disco:
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
                                                            case ProductoTipoSpec.Ram:
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
                                                            case ProductoTipoSpec.Procesador:
                                                                return (
                                                                    <FieldGroup className='flex-row'>
                                                                        <form.AppField
                                                                            name={`adquisiciones[${index}].producto_variante.spec.nucleos`}
                                                                            children={() => <ProcesadorNucleoField />}
                                                                        />
                                                                        <form.AppField
                                                                            name={`adquisiciones[${index}].producto_variante.spec.hilos`}
                                                                            children={() => <ProcesadorHilosField />}
                                                                        />
                                                                        <form.AppField
                                                                            name={`adquisiciones[${index}].producto_variante.spec.frecuencia_maxima_ghz`}
                                                                            children={() => <ProcesadorFrecuenciaMaximaGhzField />}
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
                                    </CardContent>
                                </Card>

                                <FieldError errors={field.state.meta.errors} />
                            </div>
                        ))}
                    </form.AppField>

                    <form.SubmitFormButton />
                </form.AppForm>
            </FormLayout >
        </>
    );
}

export { Form as DictaminarDictamenForm }
