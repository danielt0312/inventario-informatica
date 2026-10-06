import type { DetailedPendienteAcuseDictamen } from "@/types/dictamenes";
import { useAppForm } from '@/components/ui/form.shared';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/ui/form-layout";
import { DictamenArchivoField, DictamenOficioArchivoField } from "../fields";
import { evidenciarAcuseFormDefaultValues, evidenciarAcuseFormValidator } from "./form-schema";
import { useDictamenFormActionMutation } from '../form-action/view';
import { EmptyValue } from "@/components/ui/empty-value";

function useForm(dictamen: DetailedPendienteAcuseDictamen) {
    const { mutate } = useDictamenFormActionMutation(dictamen);

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

function Form({ dictamen }: { dictamen: DetailedPendienteAcuseDictamen }) {
    const form = useForm(dictamen);

    return (
        <FormLayout form={form}>
            <form.AppForm>
                <form.AppField
                    name="dictamen_archivo_uuid"
                    children={() => <DictamenArchivoField className="w-1/2" />}
                />

                {dictamen.oficio && dictamen.oficio.verified_at === null && (
                    <form.AppField
                        name="oficio_archivo_uuid"
                        children={() => <DictamenOficioArchivoField fieldLayout={{ label: "Adjuntar acuse de recibido del oficio de solicitud" }} className="w-1/2" />}
                    />
                )}

                <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>

                {dictamen.version_actual.adquisiciones.map((adquisicion, index) => (
                    <Card key={index} className="shadow-none">
                        <CardContent className="flex flex-col gap-6">
                            <div className="flex gap-7">
                                <div data-slot="label-container" className="w-1/12">
                                    <Label className="font-bold">Cantidad</Label>
                                    <Label>{adquisicion.cantidad}</Label>
                                </div>
                                <div data-slot="label-container" className="w-6/12">
                                    <Label className="font-bold">Producto</Label>
                                    <Label>{`${adquisicion.producto_variante.tipo?.nombre} ${adquisicion.producto_variante.descripcion} ${adquisicion.caracteristicas_adicionales ?? ''}`}</Label>
                                </div>
                                <div data-slot="label-container" className="w-3/12">
                                    <Label className="font-bold">Resguardante</Label>
                                    <Label>{adquisicion.empleado?.nombre ?? 'Juan Perez'}</Label>
                                </div>
                                <div data-slot="label-container" className="min-w-2/12">
                                    <Label className="font-bold">Numero Inventario</Label>
                                    <Label>{adquisicion.articulo?.numero_inventario ?? <EmptyValue />}</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <form.SubmitFormButton />
            </form.AppForm>
        </FormLayout>
    );
}

export {
    Form as EvidenciarAcuseDictamenForm
}
