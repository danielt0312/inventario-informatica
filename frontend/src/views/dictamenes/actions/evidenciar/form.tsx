import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Label } from "@/components/ui/label";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { DictamenArchivoField } from "../../partials/form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { adquisicionHasArticulo } from "@/routes/_auth/dictamenes/$uuid/-utils";

export function useForm(dictamen: DetailedActionDictaminadoDictamen) {
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

export function Form({ dictamen }: { dictamen: DetailedActionDictaminadoDictamen }) {
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

                {dictamen.version_actual.adquisiciones.map((adquisicion, index) => {
                    const producto = adquisicion.producto;

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
                                        <Label>{producto.tipo.nombre}</Label>
                                    </div>
                                    <div data-slot="label-container" className="w-2/6">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{adquisicion.empleado?.nombre ?? 'Juan Perez'}</Label>
                                    </div>
                                    <div data-slot="label-container" className="min-w-1/6">
                                        <Label className="font-bold">Numero Inventario</Label>
                                        <Label>{adquisicionHasArticulo(adquisicion) ? adquisicion.articulo.numero_inventario : 'N/A'}</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

                <SubmitButton />
            </form.AppForm>
        </PrimitiveForm>
    );
}
