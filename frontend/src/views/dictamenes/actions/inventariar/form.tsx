import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { ActionDictaminadoDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";
import { ProductoFieldGroup } from "./form-fields";

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

    return (
        <Form form={form}>
            <form.AppForm>
                {dictamen.dictamen_productos.flatMap((dictamenProducto) => {
                    const { producto } = dictamenProducto;

                    const fields = [];

                    for (let i = 0; i < dictamenProducto.cantidad; i++) {
                        const index = total;
                        total++;

                        fields.push(
                            <>
                                <form.AppField
                                    name="productos"
                                    mode="array"
                                    children={() => (
                                        <ProductoFieldGroup
                                            form={form}
                                            fields={{
                                                archivo_id: `productos[${index}].archivo_id`,
                                                cuenta_contable: `productos[${index}].cuenta_contable`,
                                                dictamen_producto_id: `productos[${index}].dictamen_producto_id`,
                                                numero_inventario: `productos[${index}].numero_inventario`,
                                                observaciones: `productos[${index}].observaciones`,
                                                producto_id: `productos[${index}].producto_id`,
                                                producto_tipo_id: `productos[${index}].producto_tipo_id`,
                                                resultado_esperado: `productos[${index}].resultado_esperado`
                                            }}
                                            globalCounter={total}
                                            dictamenProducto={dictamenProducto}
                                        />
                                    )}
                                />
                            </>
                        )
                    }

                    return fields;
                })}

                <SubmitButton />
            </form.AppForm>
        </Form>
    );
}
