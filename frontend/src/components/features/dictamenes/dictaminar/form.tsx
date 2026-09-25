import { useAppForm } from '@/components/ui/app-form';
import { defaultValues, validator } from "./form-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form as PrimitiveForm } from "@/components/ui/form";
import type { DetailedDictaminarDictamen } from "@/types/dictamenes";
import { useDictamenFormActionMutation } from '../form-action/view';

const useForm = (dictamen: DetailedDictaminarDictamen) => {
    const { mutate } = useDictamenFormActionMutation(dictamen);

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

function Form({ dictamen }: { dictamen: DetailedDictaminarDictamen }) {
    const form = useForm(dictamen);

    return (
        <PrimitiveForm form={form}>
            <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>

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
                                        <Label>{adquisicion.articulo?.numero_inventario ?? 'N/A'}</Label>
                                    </div>
                                </div>

                                <form.AppField
                                    name={`adquisiciones[${index}].producto_id`}
                                    children={() => <ProductoField tipoId={productoTipo.id} className="w-1/3" required />}
                                />

                                <form.AppField
                                    name={`adquisiciones[${index}].especificaciones_tecnicas`}
                                    children={() => <DictamenEspecificacionesTecnicasField />}
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

export { Form as DictaminarDictamenForm }
