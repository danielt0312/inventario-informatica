import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { defaultValues, validator } from "./form-schema";
import { useActionFormMutation } from "../partials/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProductoField } from "@/views/common/productos/form-fields";
import { CaracteristicasField } from "./form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { DetailedActionDictaminar as DetailedActionDictaminarDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export const useForm = (dictamen: DetailedActionDictaminarDictamen) => {
    const formMutation = useActionFormMutation(dictamen);

    return useAppForm({
        defaultValues: defaultValues(dictamen),
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            formMutation.mutate({ data, formApi });
        }
    });
}

export function Form({ dictamen }: { dictamen: DetailedActionDictaminarDictamen }) {
    const form = useForm(dictamen);

    return (
        <PrimitiveForm form={form}>
            <form.AppForm>
                {dictamen.version_actual.adquisiciones.map((adquisicion, index) => {
                    const productoTipo = adquisicion.producto_tipo;

                    return (
                        <Card key={index} className="shadow-none">
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex flex-row gap-6">
                                    <div className="w-1/3" data-slot="label">
                                        <Label className="font-bold">Cantidad</Label>
                                        <Label>{adquisicion.cantidad}</Label>
                                    </div>
                                    <div className="w-1/3" data-slot="label">
                                        <Label className="font-bold">Producto</Label>
                                        <Label>{productoTipo.nombre}</Label>
                                    </div>
                                    <div className="w-1/3" data-slot="label">
                                        <Label className="font-bold">Resguardante</Label>
                                        <Label>{adquisicion.empleado?.nombre ?? 'Juan Perez'}</Label>
                                    </div>
                                </div>

                                <form.AppField
                                    name={`adquisiciones[${index}].producto_id`}
                                    children={() => (
                                        <ProductoField
                                            label="Modelo"
                                            tipo={productoTipo.id}
                                            className="max-w-1/3"
                                        />
                                    )}
                                />

                                <form.AppField
                                    name={`adquisiciones[${index}].caracteristicas`}
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
