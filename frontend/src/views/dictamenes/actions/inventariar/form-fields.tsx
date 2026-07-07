import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { defaultValuesProductoField } from "./form-schema";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { DictaminadoDictamenProducto } from "@/types/dictamenes";
import { useStore } from "@tanstack/react-form";
import { ResultadoEsperadoField } from "@/views/common/articulos/recepciones/form-fields";

interface ProductoFieldGroupProps {
    globalCounter: number;
    dictamenProducto: DictaminadoDictamenProducto;
}

export const ProductoFieldGroup = withFieldGroup({
    defaultValues: defaultValuesProductoField,
    props: {} as ProductoFieldGroupProps,
    render: ({ group, globalCounter, dictamenProducto }) => {
        const resultadoEsperado = useStore(group.store, (state) => state.values.resultado_esperado);
        const { producto } = dictamenProducto;

        return (
            <>
                <Card>
                    <CardContent className="flex flex-col gap-3">
                        <Label className="font-bold text-base capitalize">Bien Informático #{globalCounter}</Label>

                        <div className="flex gap-7">
                            <div data-slot="label" className="w-7/10">
                                <Label className="font-bold">
                                    Características solicitadas
                                </Label>
                                <Label>
                                    {producto.tipo.nombre} {producto.marca.nombre} {producto.modelo.nombre} {dictamenProducto.caracteristicas}
                                </Label>
                            </div>

                            <div data-slot="label" className="w-3/10">
                                <Label className="font-bold">
                                    Resguardante
                                </Label>
                                <Label>
                                    {dictamenProducto.empleado?.nombre ?? 'Juan Pérez'}
                                </Label>
                            </div>

                            <div>
                                <group.AppField
                                    name="resultado_esperado"
                                    children={() => <ResultadoEsperadoField />}
                                    listeners={{
                                        onChange: ({ value }) => {

                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </>
        );
    }
});


