import { useAppForm } from "@/components/composed/@tanstack/form";
import { FileUploaderField } from "@/components/composed/@tanstack/form-field";
import { FilePreviewWindow } from "@/components/custom/file-preview";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import api from "@/lib/axios";
import { RequiredFile } from "@/lib/schemas/common";
import { handleFormValidationError } from "@/lib/utils";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import type { ValidatedDictamen as RouteValidatedDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import z from "zod";

export interface FormSchema {
    archivo: File[] | undefined;
}

export const submitValidator = z.object({
    archivo: RequiredFile,
});

type ValidatedDictamen = Omit<RouteValidatedDictamen, 'documento'> & {
    documento: NonNullable<RouteValidatedDictamen['documento']>;
}

export function Form({
    dictamen
}: {
    dictamen: ValidatedDictamen
}) {

    const defaultValues: FormSchema = {
        ...dictamen,
        archivo: undefined
    };

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: submitValidator
        },
        onSubmit: async ({ value, formApi }) => {
            const formData = new FormData();

            const data = submitValidator.parse(value);

            formData.append('archivo', data.archivo[0]);

            try {
                await api.post(`api/dictamenes/${dictamen.uuid}/evidenciar`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                queryClient.invalidateQueries({ queryKey: ['dictamenes'] });
                navigate({ to: IndexRoute.to });
            } catch (error) {
                handleFormValidationError(error, formApi);
            }
        }
    });

    const { mutate: previewOficio } = useFilePreviewWindowMutation(dictamen.oficio.documento.archivo.uuid);
    const { mutate: previewDictamen } = useFilePreviewWindowMutation(dictamen.documento.archivo.uuid);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="contents"
        >
            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Número de Dictamen</Label>
                    <Label>{dictamen.id}</Label>
                </div>
                <div data-slot="label" className="col-span-2">
                    <Label className="font-bold">Dictamen tecnológico</Label>
                    <FilePreviewWindow
                        label={dictamen.oficio.documento.archivo.nombre}
                        onClick={previewDictamen}
                    />
                </div>
            </div>

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

            <form.AppForm>
                <div className="grid grid-cols-2">
                    <form.AppField
                        name="archivo"
                        children={() => (
                            <FileUploaderField
                                label="Adjuntar evidencia de dictamen recibido"
                                maxFiles={1}
                                accept="application/pdf"
                            />
                        )}
                    />
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
                                            <Label className="font-bold">Características</Label>
                                            <Label>{d.caracteristicas}</Label>
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
