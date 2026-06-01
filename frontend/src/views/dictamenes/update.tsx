import Goback from "@/components/Goback"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTitle, SidebarSteps } from "./partials/form-steps";
import { Route } from "@/routes/_auth/dictamenes/$uuid/$action";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppForm } from "@/components/composed/@tanstack/form";
import z from "zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import { handleFormValidationError } from "@/lib/utils";

interface FormSchema {
    archivo?: File[];
    productos: {
        id: number;
        caracteristicas?: string;
    }[];
}

const validator = z.object({
    archivo: z
        .array(z
            .file()
            .max(5_000_000, 'El archivo no debe superar 5MB')
            , 'Debes de adjuntar un archivo')
        .min(1, 'Debes de seleccionar un archivo')
        .max(1, 'Solo puedes subir un archivo'),
    productos: z
        .array(
            z.object({
                id: z
                    .number()
                    .int(),
                caracteristicas: z
                    .string()
                    .optional()
            }))
        .min(1, 'Debes de agregar cuando menos 1 producto')
});

export function View() {
    const { dictamen } = Route.useRouteContext();

    const defaultValues: FormSchema = {
        productos: dictamen.productos
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            const formData = new FormData();

            formData.append('archivo', data.archivo[0]);
            data.productos.forEach((producto, index) => {
                formData.append(`productos[${index}][caracteristicas]`, String(producto.caracteristicas));
            });


            try {
                await api.put(`api/dictamenes/${dictamen.uuid}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } catch (error) {
                handleFormValidationError(error, formApi);
            }
        }
    });

    return (
        <>
            <Goback />
            <SidebarSteps step={dictamen.estado.id}>
                <CardHeader>
                    <CardTitle>
                        {getTitle(dictamen.estado.id).toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 **:data-[slot='label']:grid **:data-[slot='label']:gap-2">
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
                                    <Label>{dictamen.adscripcion?.nombre}</Label>
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
                                    <ButtonGroup>
                                        <Button variant="outline">
                                            {dictamen.oficio.documento.archivo.nombre}.{dictamen.oficio.documento.archivo.tipo.extension}
                                        </Button>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button><Eye /></Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Ver
                                            </TooltipContent>
                                        </Tooltip>
                                    </ButtonGroup>
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
                                            <TableHead rowSpan={2} className="border-none" />
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
                                                        <Label className="font-bold">Cantidad</Label>
                                                        <Label>{d.cantidad}</Label>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="grid grid-cols-1 gap-6">
                                                    <div data-slot="label">
                                                        <Label className="font-bold">Producto</Label>
                                                        <Label>
                                                            {d.producto.tipo.categoria.nombre} {d.producto.tipo.nombre} {d.producto.marca.nombre} {d.producto.nombre}
                                                        </Label>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div data-slot="label">
                                                        <Label className="font-bold">Resguardante</Label>
                                                        <Label>
                                                            {d.empleado.nombre}
                                                        </Label>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-fit text-center">
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <form.SubmitButton />
                        </form.AppForm>
                    </form>
                </CardContent>
            </SidebarSteps>
        </>
    )
}
