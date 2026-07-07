import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type Schema, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProductoModeloField } from "@/views/common/productos/modelos/form-fields";
import { CaracteristicasField } from "./form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { ActionDictaminarDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";

export const useForm = (dictamen: ActionDictaminarDictamenWithDictamenProductos) => {
    const productosToSchema = dictamen.dictamen_productos.map((dictamenProducto) => {
        return {
            id: dictamenProducto.id,
            caracteristicas: '',
            producto_id: undefined,
        }
    });

    const defaultValues: Schema = {
        productos: productosToSchema
    }

    const formMutation = useActionFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            formMutation.mutate({ data, formApi });
        }
    });
}

export function Form({ dictamen }: { dictamen: ActionDictaminarDictamenWithDictamenProductos }) {
    const form = useForm(dictamen);

    return (
        <PrimitiveForm form={form}>
            <form.AppForm>
                {dictamen.dictamen_productos.map((dictamenProducto, index) => {
                    const producto = dictamenProducto.producto;

                    return (
                        <Card key={index} className="shadow-none">
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex flex-row gap-6">
                                    <div className="w-1/3" data-slot="label">
                                        <Label className="font-bold">Cantidad</Label>
                                        <Label>{dictamenProducto.cantidad}</Label>
                                    </div>
                                    <div className="w-1/3" data-slot="label">
                                        <Label className="font-bold">Producto</Label>
                                        <Label>{producto.tipo.nombre}</Label>
                                    </div>
                                    <div className="w-1/3" data-slot="label">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{dictamenProducto.empleado?.nombre ?? 'Juan Perez'}</Label>
                                    </div>
                                </div>

                                <form.AppField
                                    name={`productos[${index}].producto_id`}
                                    children={() => (
                                        <ProductoModeloField
                                            label="Modelo"
                                            tipo={producto.tipo.id}
                                            className="max-w-1/3"
                                        />
                                    )}
                                />

                                <form.AppField
                                    name={`productos[${index}].caracteristicas`}
                                    children={() => <CaracteristicasField />}
                                />
                            </CardContent>
                        </Card>
                    );
                })}

                <SubmitButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}
