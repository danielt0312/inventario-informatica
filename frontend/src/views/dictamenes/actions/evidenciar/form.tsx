import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { Label } from "@/components/ui/label";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { DictamenArchivoField } from "./form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { DetailedActionDictaminado as DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export function useForm(dictamen: DetailedActionDictaminadoDictamen) {
    const { mutate } = useActionFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const { archivo } = validator.parse(value);

            const data = new FormData;
            data.append('archivo', archivo);

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
                        name="archivo"
                        children={() => <DictamenArchivoField />}
                    />
                </div>

                {dictamen.version_actual.adquisiciones.map((adquisicion, index) => {
                    const producto = adquisicion.producto;

                    return (
                        <Card key={index} className="shadow-none">
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex flex-row gap-6">
                                    <div className="w-1/10" data-slot="label">
                                        <Label className="font-bold">Cantidad</Label>
                                        <Label>{adquisicion.cantidad}</Label>
                                    </div>
                                    <div className="w-7/10" data-slot="label">
                                        <Label className="font-bold">Producto</Label>
                                        <Label>
                                            {producto.tipo.nombre} {producto.marca.nombre} {producto.nombre} {adquisicion.caracteristicas}
                                        </Label>
                                    </div>
                                    <div className="w-2/10" data-slot="label">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{adquisicion.empleado?.nombre ?? 'Juan Perez'}</Label>
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
