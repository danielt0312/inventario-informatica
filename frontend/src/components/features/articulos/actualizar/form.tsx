import { Form } from "@/components/ui/form";
import { useAppForm } from "@/components/ui/form-context";
import { useFormMutation } from "@/hooks/use-form-mutation";
import type { Articulo } from "@/types/articulos";
import { actualizarArticuloDefaultFormValues, actualizarArticuloDiscoFieldsDefaultValues, actualizarArticuloFormValidator } from "./form-schema";
import { Button } from "@/components/ui/button";
import { CircleArrowRightIcon, CircleFadingArrowUpIcon, CirclePlusIcon, CircleXIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { ProductoField } from "../../productos/form-fields";
import { ProductoTipoEnum } from "@/lib/constants";
import { DiscoTipoField } from "../discos/tipo-field";
import { DiscoCapacidadField } from "../discos/capacidad-field";

function ActualizarForm({
    articulo
}: {
    articulo: Articulo
}) {
    const { mutate, isPending } = useFormMutation({
        url: `api/articulos/${articulo.uuid}/configurar`,
        onSuccess: (_, __, ___, { client }) =>
            client.invalidateQueries({ queryKey: ['articulos'] })
    });

    const form = useAppForm({
        defaultValues: actualizarArticuloDefaultFormValues,
        validators: {
            onSubmit: actualizarArticuloFormValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = actualizarArticuloFormValidator.parse(value);
            mutate({ data, formApi })
        }
    });

    const [alertOpen, setAlertOpen] = React.useState(false);

    return (
        <Form form={form} className="flex flex-col gap-7">
            <form.AppForm>
                <form.AppField name="discos" mode="array">
                    {(field) => (
                        <>
                            <div className="flex flex-row justify-between">
                                <Label className="text-xl font-bold">Discos</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        field.pushValue(actualizarArticuloDiscoFieldsDefaultValues)
                                    }}
                                >
                                    <CirclePlusIcon /> Agregar
                                </Button>
                            </div>

                            {field.state.value.map((_, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex justify-between">
                                            <span className="normal-case">Disco #{index+1}</span>
                                            <Button size="sm" variant="destructive" onClick={() => field.removeValue(index)}>
                                                <Trash2Icon/> Eliminar
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <FieldGroup className="flex-row">
                                            <form.AppField
                                                name={`discos[${index}].producto_id`}
                                                children={() => <ProductoField tipo={ProductoTipoEnum.DISCO} layout={{ label: "Modelo" }} required />}
                                            />
                                            <form.AppField
                                                name={`discos[${index}].tipo_id`}
                                                children={() => <DiscoTipoField required />}
                                            />
                                            <form.AppField
                                                name={`discos[${index}].capacidad_id`}
                                                children={() => <DiscoCapacidadField required />}
                                            />
                                            {/* <form.AppField
                                                name={`discos[${index}].tipo_id`}
                                                children={() => <DiscoTipoField required />}
                                            />
                                            <form.AppField
                                                name={`discos[${index}].capacidad_id`}
                                                children={() => <DiscoCapacidadField required />}
                                            />
                                            <form.AppField
                                                name={`discos[${index}].interfaz_id`}
                                                children={() => <DiscoInterfazField />}
                                            /> */}
                                        </FieldGroup>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </form.AppField>

                <Button
                    onClick={async() => {
                        form.validateSync('submit');
                        await form.validateAsync('submit');
                        if (!form.state.isValid) return;
                        setAlertOpen(true);
                    }}
                    className="self-center"
                >
                    <CircleFadingArrowUpIcon /> Actualizar
                </Button>

                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Deseas continuar?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Estarás actualizando las especificaciones de este equipo.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => { form.handleSubmit(); }} disabled={isPending}>
                                <CircleArrowRightIcon /> Continuar
                            </AlertDialogAction>
                            <AlertDialogCancel>
                                <CircleXIcon /> Cancelar
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form.AppForm>
        </Form>
    );
}

export {
    ActualizarForm as ActualizarArticuloForm
}
