import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Route } from "@/routes/_auth/dictamenes/$uuid/$action";
import type { DictaminadoDictamenWithDictaminadoDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { ResultadoEsperadoFieldGroup } from "@/views/common/articulos/recepciones/form-fields";
import { useStore } from "@tanstack/react-form";
import { Separator } from "@/components/ui/separator";
import { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";

export const useForm = (dictamen: DictaminadoDictamenWithDictaminadoDictamenProductos) => {
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

export function InventariarForm() {
    const { dictamen: data } = Route.useRouteContext();

    const dictamen = data as DictaminadoDictamenWithDictaminadoDictamenProductos;

    const form = useForm(dictamen);
    let total = 0;
    let index = 0;

    const errors = useStore(form.store, (state) => state.errors)

    console.log(errors);

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
