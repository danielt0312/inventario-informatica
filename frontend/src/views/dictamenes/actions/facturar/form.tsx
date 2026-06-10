import { useAppForm } from "@/components/composed/@tanstack/form";
import { useFormMutation } from "../form";
import type { Schema, ValidatedDictamen } from "./form-schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { submitValidator } from "../evidenciar/form-schema";
import { Label } from "@/components/ui/label";

export function useForm(dictamen: ValidatedDictamen) {
    const defaultValues: Schema = {
        ...dictamen,
        archivo: []
    };

    const formMutation = useFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: submitValidator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = submitValidator.parse(value);
            const formData = new FormData;

            formData.append('archivo', data.archivo[0]);

            formMutation.mutate({ data: formData, api: formApi })
        }
    });
}

export function Form({ dictamen }: { dictamen: ValidatedDictamen }) {
    const form = useForm(dictamen);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="contents"
        >
            <form.AppForm>
                <div className="rounded-lg overflow-hidden border border-neutral-200">
                    <Table>
                        <TableHeader className="[&_tr]:bg-neutral-100 [&_tr]:hover:bg-neutral-100 [&_th]:font-bold [&_th]:text-center [&_th]:border-r">
                            <TableRow>
                                <TableHead colSpan={2}>
                                    Bien Informático
                                </TableHead>
                                <TableHead rowSpan={2} className="w-1/4">
                                    Resguardante
                                </TableHead>
                                <TableHead rowSpan={2} className="border-none w-1/4">
                                    Factura
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
