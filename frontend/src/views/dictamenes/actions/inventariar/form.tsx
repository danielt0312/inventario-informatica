import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { ResultadoEsperadoFieldGroup } from "@/views/common/articulos/recepciones/form-fields";
import { Separator } from "@/components/ui/separator";
import { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import type { ActionDictaminadoDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";

export const useForm = (dictamen: ActionDictaminadoDictamenWithDictamenProductos) => {
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

export function InventariarForm({ dictamen }: { dictamen: ActionDictaminadoDictamenWithDictamenProductos }) {
    const form = useForm(dictamen);
    let total = 0;
    let index = 0;

    return (
        <Form form={form}>
            <form.AppForm>
                {dictamen.dictamen_productos.map((dictamenProducto) => {
                    const { producto } = dictamenProducto;

                    for (let i = 0; i < dictamenProducto.cantidad; i++) {
                        total++;
                        index = total-1;

                        return (
                            <Card key={total}>
                                <CardContent className="flex flex-col gap-4">
                                    <Label className="font-bold text-md">
                                        Bien Informático #{total}
                                    </Label>

                                    <div className="flex gap-7 items-start">
                                        <div className="w-7/10" data-slot="label">
                                            <Label className="font-bold">Características esperadas</Label>
                                            <Label>
                                                {producto.tipo.nombre} {producto.marca.nombre} {producto.modelo.nombre} {dictamenProducto.caracteristicas}
                                            </Label>
                                        </div>
                                        <div className="w-3/10" data-slot="label">
                                            <Label className="font-bold">Resguardante</Label>
                                            <Label>
                                                {dictamenProducto.empleado?.nombre ?? 'Juan Perez'}
                                            </Label>
                                        </div>
                                    </div>

                                    <div>
                                        <ResultadoEsperadoFieldGroup
                                            form={form}
                                            fields={{
                                                resultado_esperado: `productos[${index}].resultado_esperado`,
                                                observaciones: `productos[${index}].observaciones`,
                                            }}
                                        />
                                    </div>
                                </CardContent>
                                <Separator orientation="horizontal" />
                                <CardContent>
                                    <form.AppField
                                        name={`productos[${index}].producto_tipo_id`}
                                        children={() => <ProductoTipoField />}
                                    />
                                </CardContent>
                            </Card>
                        );
                    }
                })}

                <SubmitButton />
            </form.AppForm>
        </Form>
    );
}
