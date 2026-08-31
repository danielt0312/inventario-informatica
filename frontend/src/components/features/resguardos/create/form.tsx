import { Form } from "@/components/ui/form";
import { useAppForm } from "@/components/ui/form-context";
import { EmpleadoField } from "../../externos/empleados/form-fields";
import { createResguardoDefaultValues, createResguardoValidator } from "./form-schema";
import { DatePicker } from "@/components/ui/date-picker";
import { FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { BaseFieldLayout } from "@/components/ui/field-layout";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { articuloDefaultColumnsBuilder } from "@/views/articulos/partials/table-cols";
import type { Articulo } from "@/types/articulos";
import type { ResguardoArticulo } from "@/types/resguardos";
import { toLocaleDateFormat } from "@/lib/utils";

type ArticuloResguardado = ResguardoArticulo<Articulo> | {
    id: undefined;
    articulo: Articulo;
}

function TableArticulosResguardados({
    data
}: {
    data: ArticuloResguardado[]
}) {
    const table = useReactTable({
        columns: [
            {
                header: "Fecha de Asignación",
                cell: ({ row: { original } }) => (
                    toLocaleDateFormat(original.id === undefined
                        ? new Date
                        : original.fecha_asignacion
                    )
                )
            },
            ...articuloDefaultColumnsBuilder<ArticuloResguardado>(row => row.articulo)
        ],
        data,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <DataTable table={table} />
    );
}

function CreateForm() {
    const form = useAppForm({
        defaultValues: createResguardoDefaultValues,
        validators: {
            onSubmit: createResguardoValidator
        }
    });

    return (
        <Form form={form} className="flex flex-col gap-7">
            <form.AppForm>
                <FieldGroup className="flex-row">
                    <form.AppField
                        name="empleado_id"
                        children={() => <EmpleadoField required />}
                    />

                    <BaseFieldLayout label="Fecha de actualización" required disabled>
                        <DatePicker value={new Date} disabled />
                    </BaseFieldLayout>
                </FieldGroup>

                <div className="flex justify-between">
                    <Label className="font-bold text-lg">Bienes Informáticos Resguardados</Label>

                    <form.Subscribe selector={(state) => state.values.empleado_id}>
                        {(empleadoId) => (
                            <Button
                                disabled={empleadoId === undefined}
                                variant="outline"
                                size="sm"
                            >
                                <PlusCircleIcon /> Agregar
                            </Button>
                        )}
                    </form.Subscribe>
                </div>

                <TableArticulosResguardados
                    data={[

                    ]}
                />

                <form.SubmitFormButton />
            </form.AppForm>
        </Form>
    );
}

export {
    CreateForm as CreateResguardoForm
}
