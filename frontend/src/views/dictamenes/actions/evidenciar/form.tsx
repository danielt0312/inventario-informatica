import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Label } from "@/components/ui/label";
import { validator, type Schema } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { DictamenArchivoField } from "./form-fields";
import type { DictaminadoDictamenWithDictaminadoDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";

export function useForm(dictamen: DictaminadoDictamenWithDictaminadoDictamenProductos) {
    const defaultValues: Schema = {
        ...dictamen,
        archivo: []
    };

    const formMutation = useActionFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);
            const formData = new FormData;

            formData.append('archivo', data.archivo[0]);

            formMutation.mutate({ data: formData, formApi })
        }
    });
}

export function Form({ dictamen }: { dictamen: DictaminadoDictamenWithDictaminadoDictamenProductos }) {
    const form = useForm(dictamen);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="contents"
        >
            <form.AppForm>
                <div className="grid grid-cols-2">
                    <form.AppField
                        name="archivo"
                        children={() => <DictamenArchivoField />}
                    />
                </div>

                {dictamen.dictamen_productos.map((dictamenProducto, index) => {
                    const producto = dictamenProducto.producto;

                    return (
                        <Card key={index} className="shadow-none">
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex flex-row gap-6">
                                    <div className="w-1/10" data-slot="label">
                                        <Label className="font-bold">Cantidad</Label>
                                        <Label>{dictamenProducto.cantidad}</Label>
                                    </div>
                                    <div className="w-7/10" data-slot="label">
                                        <Label className="font-bold">Producto</Label>
                                        <Label>
                                            {producto.tipo.nombre} {producto.marca.nombre} {producto.modelo.nombre} {dictamenProducto.caracteristicas}
                                        </Label>
                                    </div>
                                    <div className="w-2/10" data-slot="label">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{dictamenProducto.empleado?.nombre ?? 'Juan Perez'}</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                <form.SubmitButton />
            </form.AppForm>
        </form>
    );
}
