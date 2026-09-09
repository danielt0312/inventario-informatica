import { useAppForm } from "@/components/ui/form-context";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Form as PrimitiveForm } from "@/components/ui/form";
import type { DetailedPendienteAcuseDictamen } from "@/types/dictamenes";
import { useActionFormMutation } from "../partials/form";
import { DictamenArchivoField, OficioArchivoField } from "../../partials/form-fields";
import { ShowBienesInformaticosTitle } from "../../partials/show-info";
import { evidenciarAcuseFormDefaultValues, evidenciarAcuseFormValidator } from "./form-schema";

export function useForm(dictamen: DetailedPendienteAcuseDictamen) {
    const { mutate } = useActionFormMutation(dictamen);

    // TODO validar cuando el oficio no existe debido a la adscripcion
    const validator = evidenciarAcuseFormValidator(!(dictamen.oficio && dictamen.oficio.verified_at !== null));

    return useAppForm({
        defaultValues: evidenciarAcuseFormDefaultValues,
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
                <form.AppField
                    name="dictamen_archivo_uuid"
                    children={() => <DictamenArchivoField className="w-1/2" />}
                />

                {dictamen.oficio && dictamen.oficio.verified_at === null && (
                    <form.AppField
                        name="oficio_archivo_uuid"
                        children={() => <OficioArchivoField fieldLayout={{ label: "Adjuntar acuse de recibido del oficio de solicitud" }} className="w-1/2" />}
                    />
                )}

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
                                        <Label>{`${producto.tipo.nombre} ${producto.marca.nombre} ${producto.modelo} ${adquisicion.especificaciones_tecnicas}`}</Label>
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
