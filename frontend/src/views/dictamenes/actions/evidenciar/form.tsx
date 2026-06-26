import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Label } from "@/components/ui/label";
import { validator, type Schema } from "./form-schema";
import { useFormMutation } from "../partials/form";
import type {
    ActionDictamenProducto as TActionDictamenProducto,
    ActionDictamenWithActionDictamenProductos as TActionDictamenWithActionDictamenProductos
} from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DetailedProducto } from "@/types/productos";
import type { DictamenProducto as TDictamenProducto } from "@/types/dictamenes";
import { Card, CardContent } from "@/components/ui/card";
import { DictamenArchivoField } from "./form-fields";

type BaseActionDictamenProducto = TActionDictamenProducto<TDictamenProducto<DetailedProducto>>;
type ActionDictamenProducto = Omit<BaseActionDictamenProducto, 'caracteristicas'> & {
    caracteristicas: NonNullable<BaseActionDictamenProducto['caracteristicas']>
};
export type ActionDictamen = TActionDictamenWithActionDictamenProductos<ActionDictamenProducto>;

export function useForm(dictamen: ActionDictamen) {
    const defaultValues: Schema = {
        ...dictamen,
        archivo: []
    };

    const formMutation = useFormMutation(dictamen);

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

export function Form({ dictamen }: { dictamen: ActionDictamen }) {
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

                {dictamen.productos.map((dictamenProducto, index) => {
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
                                            {producto.tipo.nombre} {producto.marca.nombre} {producto.nombre} {dictamenProducto.caracteristicas}
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
