import { useAppForm } from "@/components/ui/form-context";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProductoField } from "@/components/features/productos/form-fields";
import { Form as PrimitiveForm } from "@/components/ui/form";
import { CaracteristicasField } from "../../partials/form-fields";
import { adquisicionHasArticulo } from "@/routes/_auth/dictamenes/$uuid/-utils";
import { ShowBienesInformaticosTitle } from "../../partials/show-info";
import type { DetailedDictaminarDictamen } from "@/types/dictamenes";

export const useForm = (dictamen: DetailedDictaminarDictamen) => {
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

export function Form({ dictamen }: { dictamen: DetailedDictaminarDictamen }) {
    const form = useForm(dictamen);

    return (
        <PrimitiveForm form={form}>
            <ShowBienesInformaticosTitle />

            <form.AppForm>
                {dictamen.version_actual.adquisiciones.map((adquisicion, index) => {
                    const productoTipo = adquisicion.producto_tipo;

                    return (
                        <Card key={index} className="shadow-none">
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex gap-7">
                                    <div data-slot="label-container" className="w-1/6">
                                        <Label className="font-bold">Cantidad</Label>
                                        <Label>{adquisicion.cantidad}</Label>
                                    </div>
                                    <div data-slot="label-container" className="w-2/6">
                                        <Label className="font-bold">Producto</Label>
                                        <Label>{productoTipo.nombre}</Label>
                                    </div>
                                    <div data-slot="label-container" className="w-2/6">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{adquisicion.empleado?.nombre ?? 'Juan Perez'}</Label>
                                    </div>
                                    <div data-slot="label-container" className="min-w-1/6">
                                        <Label className="font-bold">Número de Inventario</Label>
                                        <Label>{adquisicionHasArticulo(adquisicion) ? adquisicion.articulo.numero_inventario : 'N/A'}</Label>
                                    </div>
                                </div>

                                <form.AppField
                                    name={`adquisiciones[${index}].producto_id`}
                                    children={() => <ProductoField tipo={productoTipo.id} className="w-1/3" required />}
                                />

                                <form.AppField
                                    name={`adquisiciones[${index}].caracteristicas`}
                                    children={() => <CaracteristicasField />}
                                />
                            </CardContent>
                        </Card>
                    );
                })}

                <form.SubmitFormButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}
