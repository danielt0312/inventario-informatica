import { useAppForm } from "@/components/composed/@tanstack/form";
import { TextareaField } from "@/components/composed/@tanstack/form-field";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Schema, validator } from "./form-schema";
import { FilePreviewWindow } from "@/components/custom/file-preview";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { useFormMutation } from "../form";
import type { ValidatedDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";

export const useForm = (dictamen: ValidatedDictamen) => {
    const formatedProductos = dictamen.productos.map(v => {
        return {
            ...v,
            caracteristicas: v.caracteristicas ?? '',
        }
    });

    const defaultValues: Schema = {
        productos: formatedProductos
    }

    const formMutation = useFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            formMutation.mutate({ data, api: formApi });
        }
    });
}

export function Form({
    dictamen
}: {
    dictamen: ValidatedDictamen
}) {
    const form = useForm(dictamen);
    const { mutate: previewOficio } = useFilePreviewWindowMutation(dictamen.oficio.documento.archivo.uuid);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="contents"
        >
            <form.AppForm>
                <div className="grid grid-cols-3">
                    <div data-slot="label">
                        <Label className="font-bold">Área Solicitante</Label>
                        <Label>{dictamen.adscripcion?.nombre ?? 'Dirección de Tecnologías de la Información'}</Label>
                    </div>
                    <div data-slot="label">
                        <Label className="font-bold">Folio de solicitud</Label>
                        <Label>{dictamen.oficio.folio}</Label>
                    </div>
                    <div data-slot="label">
                        <Label className="font-bold">Fecha de solicitud</Label>
                        <Label>{String(dictamen.fecha_solicitud)}</Label>
                    </div>
                </div>

                <div className="grid grid-cols-3">
                    <div data-slot="label">
                        <Label className="font-bold">Oficio de Solicitud</Label>
                        <FilePreviewWindow
                            label={dictamen.oficio.documento.archivo.nombre}
                            onClick={previewOficio}
                        />
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-neutral-200">
                    <Table>
                        <TableHeader className="[&_tr]:bg-neutral-100 [&_tr]:hover:bg-neutral-100 [&_th]:font-bold [&_th]:text-center [&_th]:border-r">
                            <TableRow>
                                <TableHead colSpan={2}>
                                    Bien Informático
                                </TableHead>
                                <TableHead rowSpan={2} className="border-none w-1/4">
                                    Resguardante
                                </TableHead>
                                {/* todo quitar esto */}
                                <TableHead rowSpan={2} className="border-none"></TableHead>
                            </TableRow>

                            <TableRow>
                                <TableHead>
                                    Cantidad
                                </TableHead>
                                <TableHead>
                                    Especificaciones técnicas
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="[&_tr]:hover:bg-transparent [&_td]:border-r [&_td:nth-last-child(-n+2)]:border-r-transparent">
                            {dictamen.productos.map((d, index) => (
                                <TableRow key={index}>
                                    <TableCell className="w-25">
                                        <div data-slot="label">
                                            <Label className="text-center">{d.cantidad}</Label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="grid grid-cols-1 gap-6">
                                        <div data-slot="label">
                                            <Label className="font-bold">Producto</Label>
                                            <Label>
                                                {d.producto.tipo.categoria.nombre} {d.producto.tipo.nombre} {d.producto.marca.nombre} {d.producto.nombre}
                                            </Label>
                                        </div>
                                        <div data-slot="label">
                                            <form.AppField
                                                name={`productos[${index}].caracteristicas`}
                                                children={() => (
                                                    <TextareaField
                                                        label="Características"
                                                        placeholder="Especifica las características del bien informático"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-slot="label">
                                            <Label className="text-center">
                                                {d.empleado?.nombre ?? 'Juan Pérez'}
                                            </Label>
                                        </div>
                                    </TableCell>
                                    {/* todo quitar esto */}
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <form.SubmitButton />
            </form.AppForm>
        </form>
    );
}
