import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { ActionDictaminadoDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ResultadoEsperadoFieldGroup } from "@/views/common/articulos/recepciones/form-fields";
import { Separator } from "@/components/ui/separator";
import { ProductoGroupField } from "@/views/common/productos/modelos/form-fields";

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
    const slots = dictamen.dictamen_productos.flatMap((dictamenProducto) =>
        Array.from({ length: dictamenProducto.cantidad }, (_, i) => ({
            dictamenProducto,
            localIndex: i,
        }))
    );

    return (
        <Form form={form}>
            <form.AppForm>
                {slots.map((slot, globalIndex) => (
                    <form.AppField
                        key={`${slot.dictamenProducto.id}-${slot.localIndex}`}
                        name="productos"
                        mode="array"
                        children={() => {
                            const { producto, ...dictamenProducto } = slot.dictamenProducto;

                            return (
                                <Card>
                                    <CardContent className="flex flex-col gap-4">
                                        <Label className="font-bold text-base capitalize">Bien Informático #{globalIndex + 1}</Label>

                                        <div className="flex flex-col gap-7">
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
                                            </div>

                                            <div>
                                                <ResultadoEsperadoFieldGroup
                                                    form={form}
                                                    fields={{
                                                        observaciones: `productos[${globalIndex}].observaciones`,
                                                        resultado_esperado: `productos[${globalIndex}].resultado_esperado`
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
                                                modelo_id: `productos[${globalIndex}].producto_id`,
                                                tipo_id: `productos[${globalIndex}].producto_tipo_id`
                                            }}
                                            className="flex-row"
                                        />

                                        <div>
                                            <form.AppField
                                                name={`productos[${globalIndex}].archivo_uuid`}
                                                children={() => <></>}
                                            />
                                        </div>
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
