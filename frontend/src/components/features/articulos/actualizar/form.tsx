import type { Articulo } from "@/types/articulos";
import { FormLayout } from "@/components/ui/form-layout";
import { useAppForm } from "@/components/ui/form.shared";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { ProductoVarianteGenericaField } from "../../productos/variante-generica-field";
import { ProductoTipoEnum, ProductoTipoGenericos } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { FieldGroup } from "@/components/ui/field";
import { RamTipoField } from "../../rams/tipo-field";
import { RamCapacidadField } from "../../rams/capacidad-field";
import { RamVelocidadField } from "../../rams/velocidad-field";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon, SaveIcon } from "lucide-react";
import { DiscoTipoField } from "../../discos/tipo-field";
import { DiscoCapacidadField } from "../../discos/capacidad-field";
import { DiscoFactorFormaField } from "../../discos/factor-forma-field";
import { DiscoInterfazField } from "../../discos/interfaz-field";

function Form({
    articulo
}: {
    articulo: Articulo
}) {
    const form = useAppForm({
        defaultValues: {
            cpu: undefined,
            procesador: undefined,
            ram: [],
            discos: [],
            aplicaciones: []
        } as {
            cpu: undefined | number;
            procesador: undefined | number;
            ram: {
                tipo: undefined | number;
                capacidad: undefined | number;
                velocidad: undefined | number;
            }[]
            discos: {
                tipo: undefined | number;
                capacidad: undefined | number;
                factor_forma: undefined | number;
                interfaz: undefined | number;
            }[]
            aplicaciones: {
                id: undefined | number;
            }[]
        }
    })

    return (
        <FormLayout form={form} className="flex flex-col gap-7">
            <form.AppForm>
                <CardContent className="flex">
                    <Label className="min-w-1/7 text-lg font-bold">Sistema Operativo</Label>

                    <FieldGroup>
                        <form.AppField
                            name="cpu"
                            children={() => (
                                <ProductoVarianteGenericaField
                                    tipoId={10}
                                    layout={{ label: undefined }}
                                />
                            )}
                        />
                    </FieldGroup>
                </CardContent>

                <Separator />

                <CardContent className="flex">
                    <Label className="min-w-1/7 text-lg font-bold">Procesador</Label>

                    <form.AppField
                        name="procesador"
                        children={() => (
                            <ProductoVarianteGenericaField
                                tipoId={ProductoTipoGenericos.Procesador}
                                layout={{ label: undefined }}
                            />
                        )}
                    />
                </CardContent>

                <Separator />

                <CardContent className="flex">
                    <Label className="min-w-1/7 text-lg font-bold">Aplicaciones de Escritorio</Label>

                    <FieldGroup>
                        <Button size="sm" className="max-w-min self-end">
                            <CirclePlusIcon /> Agregar
                        </Button>

                        <FieldGroup className="grid grid-cols-3">
                            {[0, 1].map((_, index) => (
                                <form.AppField
                                    key={index}
                                    name={`aplicaciones[${index}].id`}
                                    children={() => (
                                        <ProductoVarianteGenericaField
                                            tipoId={2}
                                            layout={{ label: `Aplicación #${index+1}` }}
                                        />
                                    )}
                                />
                            ))}
                        </FieldGroup>
                    </FieldGroup>
                </CardContent>
                <Separator />

                <CardContent className="flex">
                    <Label className="min-w-1/7 text-lg font-bold">RAMs</Label>

                    <FieldGroup>
                        <Button size="sm" className="max-w-min self-end">
                            <CirclePlusIcon /> Agregar
                        </Button>

                        {[0, 1].map((_, index) => (
                            <div key={index} className="flex gap-2">
                                <Label className="w-8">Slot #{index + 1}</Label>

                                <FieldGroup className="flex-row">
                                    <form.AppField
                                        name={`discos[${index}].tipo`}
                                        children={() => <DiscoTipoField required />}
                                    />
                                    <form.AppField
                                        name={`discos[${index}].capacidad`}
                                        children={() => <DiscoCapacidadField required />}
                                    />
                                    <form.AppField
                                        name={`discos[${index}].factor_forma`}
                                        children={() => <DiscoFactorFormaField />}
                                    />
                                    <form.AppField
                                        name={`discos[${index}].interfaz`}
                                        children={() => <DiscoInterfazField />}
                                    />
                                </FieldGroup>
                            </div>
                        ))}
                    </FieldGroup>
                </CardContent>

                <Separator />

                <CardContent className="flex">
                    <Label className="min-w-1/7 text-lg font-bold">Discos</Label>

                    <FieldGroup>
                        <Button size="sm" className="max-w-min self-end">
                            <CirclePlusIcon /> Agregar
                        </Button>

                        {[0].map((_, index) => (
                            <div key={index} className="flex gap-2">
                                <Label className="w-8"> #{index + 1}</Label>

                                <FieldGroup className="flex-row">
                                    <form.AppField
                                        name={`ram[${index}].tipo`}
                                        children={() => <RamTipoField required />}
                                    />
                                    <form.AppField
                                        name={`ram[${index}].capacidad`}
                                        children={() => <RamCapacidadField required />}
                                    />
                                    <form.AppField
                                        name={`ram[${index}].velocidad`}
                                        children={() => <RamVelocidadField />}
                                    />
                                </FieldGroup>
                            </div>
                        ))}
                    </FieldGroup>
                </CardContent>

                <Separator />

                <CardContent className="flex flex-col">
                    <Button className="self-center">
                        <SaveIcon /> Guardar
                    </Button>
                </CardContent>
            </form.AppForm>
        </FormLayout>
    );
}

export {
    Form as ActualizarArticuloForm
}
