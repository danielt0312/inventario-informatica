import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type Schema, validator } from "./form-schema";
import { useFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProductoField } from "@/views/common/productos/partials/form-fields";
import { CaracteristicasField } from "./form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { ActionDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";

export const useForm = (dictamen: ActionDictamenWithDictamenProductos) => {
    const productosToSchema = dictamen.productos.map(v => {
        return {
            id: String(v.id),
            caracteristicas: '',
            producto_id: '',
        }
    });

    const defaultValues: Schema = {
        productos: productosToSchema
    }

    const formMutation = useFormMutation(dictamen);

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

interface FormProps {
    dictamen: ActionDictamenWithDictamenProductos;
}

export function Form({
    dictamen
}: FormProps) {
    const form = useForm(dictamen);

    return (
        <PrimitiveForm form={form}>
            <form.AppForm>
                {dictamen.productos.map((dictamenProducto, index) => (
                    <Card key={index} className="shadow-none">
                        <CardContent className="flex flex-col gap-6">
                            <div className="flex flex-row gap-6">
                                <div className="w-1/3" data-slot="label">
                                    <Label className="font-bold">Cantidad</Label>
                                    <Label>{dictamenProducto.cantidad}</Label>
                                </div>
                                <div className="w-1/3" data-slot="label">
                                    <Label className="font-bold">Producto</Label>
                                    <Label>{dictamenProducto.producto_tipo.nombre}</Label>
                                </div>
                                <div className="w-1/3" data-slot="label">
                                    <Label className="font-bold">Resguardante</Label>
                                    <Label>{dictamenProducto.empleado?.nombre ?? 'Juan Perez'}</Label>
                                </div>
                            </div>

                            <form.AppField
                                name={`productos[${index}].producto_id`}
                                children={() => (
                                    <ProductoField
                                        label="Modelo"
                                        tipo_id={dictamenProducto.producto_tipo.id}
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
                ))}

                <SubmitButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}
