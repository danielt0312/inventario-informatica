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
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import React from "react";

type ArticuloResguardado = ResguardoArticulo<Articulo> | {
    id: undefined;
    articulo: Articulo;
}

function CreateForm() {
    const form = useAppForm({
        defaultValues: createResguardoDefaultValues,
        validators: {
            onSubmit: createResguardoValidator
        }
    });

    const empleadoId = useStore(form.store, (state) => state.values.empleado_id);

    const { data: articulosResguardadosPrevios = [] } = useQuery({
        enabled: empleadoId !== undefined,
        queryKey: ['resguardos', empleadoId],
        queryFn: () => api.get<TResponse<ResguardoArticulo<Articulo>[]>>(`api/resguardos`, {
            params: {
                include: [
                    'articulosResguardados.articulo.producto.marca',
                    'articulosResguardados.articulo.producto.tipo.categoria',
                ],
                filter: { empleado: empleadoId }
            }
        }).then(r => r.data.data)
    });

    const [articulosResguardados, setArticulosResguardados] = React.useState<ArticuloResguardado[]>(articulosResguardadosPrevios);

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
            ...articuloDefaultColumnsBuilder<ArticuloResguardado>(row => row.articulo),
            {
                id: "actions",
                cell: () => (
                    <Button>
                        Remover
                    </Button>
                )
            }
        ],
        data: articulosResguardados,
        getCoreRowModel: getCoreRowModel()
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

                    <Button
                        disabled={empleadoId === undefined}
                        variant="outline"
                        size="sm"
                    >
                        <PlusCircleIcon /> Agregar
                    </Button>
                </div>


                <DataTable
                    table={table}
                />

                <form.SubmitFormButton />
            </form.AppForm>
        </Form>
    );
}

export {
    CreateForm as CreateResguardoForm
}
