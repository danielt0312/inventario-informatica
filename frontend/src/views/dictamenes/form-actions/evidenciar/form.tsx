import { useAppForm } from "@/components/ui/form-context";
import { Label } from "@/components/ui/label";
import { defaultValues, validator } from "./form-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Form as PrimitiveForm } from "@/components/ui/form";
import type { DetailedPendienteAcuseDictamen } from "@/types/dictamenes";
import { useActionFormMutation } from "../partials/form";
import { DictamenArchivoField } from "../../partials/form-fields";
import { ShowBienesInformaticosTitle } from "../../partials/show-info";

export function useForm(dictamen: DetailedPendienteAcuseDictamen) {
    const { mutate } = useActionFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });
}

export function Form({ dictamen }: { dictamen: DetailedPendienteAcuseDictamen }) {
    const form = useForm(dictamen);

    return (
        <PrimitiveForm form={form}>
            <form.AppForm>
                <div className="grid grid-cols-2">
                    <form.AppField
                        name="archivo_uuid"
                        children={() => <DictamenArchivoField />}
                    />
                </div>

                <ShowBienesInformaticosTitle />

                {dictamen.version_actual.adquisiciones.map((adquisicion, index) => {
                    const producto = adquisicion.producto;

                    return (
                        <Card key={index} className="shadow-none">
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex gap-7">
                                    <div data-slot="label-container" className="w-1/12">
                                        <Label className="font-bold">Cantidad</Label>
                                        <Label>{adquisicion.cantidad}</Label>
                                    </div>
                                    <div data-slot="label-container" className="w-6/12">
                                        <Label className="font-bold">Producto</Label>
                                        <Label>{`${producto.tipo.nombre} ${producto.marca.nombre} ${producto.nombre} ${adquisicion.especificaciones_tecnicas}`}</Label>
                                    </div>
                                    <div data-slot="label-container" className="w-3/12">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{adquisicion.empleado?.nombre ?? 'Juan Perez'}</Label>
                                    </div>
                                    <div data-slot="label-container" className="min-w-2/12">
                                        <Label className="font-bold">Numero Inventario</Label>
                                        <Label>{adquisicion.articulo?.numero_inventario ?? 'N/A'}</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                <form.SubmitFormButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}
