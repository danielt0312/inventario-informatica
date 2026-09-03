import { Form } from "@/components/ui/form";
import { useAppForm } from "@/components/ui/form-context";
import { EmpleadoField } from "../../externos/empleados/form-fields";
import { createResguardoDefaultValues, createResguardoValidator, type CreateResguardoSchemaOutput } from "./form-schema";
import { DatePicker } from "@/components/ui/date-picker";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseFieldLayout } from "@/components/ui/field-layout";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { articuloDefaultColumnsBuilder } from "@/views/articulos/partials/table-cols";
import type { Articulo } from "@/types/articulos";
import type { DetailedResguardo, ResguardoArticulo } from "@/types/resguardos";
import { toLocaleDateFormat } from "@/lib/utils";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppQueryTable } from "@/components/ui/query-datatable";
import { CheckCircleIcon, CirclePlusIcon, CircleXIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { usePagination } from "@/hooks/use-pagination";
import { usePaginatedQuery } from "@/hooks/use-paginated-query";
import { DataTableLayout } from "@/components/ui/datatable-layout";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/resguardos";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type ArticuloResguardado = ResguardoArticulo<Articulo> | {
    id?: undefined;
    articulo: Articulo;
}

function CreateView() {
    const { mutate } = useFormMutation<any, CreateResguardoSchemaOutput>({
        method: 'PUT',
        url: (data) => `api/empleados/${data.empleado_id}/resguardo`,
        onSuccess: async (_, __, ___, { client }) => {
            await client.invalidateQueries({ queryKey: ["resguardos"] });
            await navigate({ to: Route.to });
        }
    });

    const form = useAppForm({
        defaultValues: createResguardoDefaultValues,
        validators: {
            onSubmit: createResguardoValidator
        },
        onSubmit: ({ value, formApi }) => {
            console.count('handleSubmit');

            const data = createResguardoValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    const empleadoId = useStore(form.store, (state) => state.values.empleado_id);


    const navigate = useNavigate();

    const { data: articulosResguardadosPrevios } = useQuery({
        enabled: empleadoId !== undefined,
        queryKey: ['resguardos', empleadoId],
        queryFn: () => api.get<TResponse<DetailedResguardo<Articulo> | null>>(`api/empleados/${empleadoId}/resguardo`, {
            params: {
                include: [
                    'articulosResguardados.articulo.producto.marca',
                    'articulosResguardados.articulo.producto.tipo.categoria',
                ],
                filter: { empleado: empleadoId }
            }
        }).then(r => r.data.data)
    });

    const [articulosResguardados, setArticulosResguardados] = React.useState<ArticuloResguardado[]>(articulosResguardadosPrevios?.articulos_resguardados ?? []);
    const articulosResguardadosIds = React.useMemo(
        () => new Set(articulosResguardados.map(ar => ar.articulo.uuid)),
        [articulosResguardados]
    );

    React.useEffect(() => {
        form.setFieldValue('articulos', articulosResguardados.map(ar => ar.articulo.uuid));
    }, [articulosResguardados]);


    const formTable = useReactTable({
        data: articulosResguardados,
        columns: [
            {
                header: "Fecha de Asignación",
                cell: ({ row: { original } }) => (
                    original.id !== undefined
                        ? toLocaleDateFormat(original.fecha_asignacion)
                        : <span className="italic text-muted-foreground">N/A</span>
                )
            },
            ...articuloDefaultColumnsBuilder<ArticuloResguardado>(row => row.articulo),
            {
                id: "actions",
                cell: ({ row }) => (
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                            const articuloActual = row.original;
                            setArticulosResguardados(prev => prev.filter(item => item !== articuloActual));
                        }}
                    >
                        <Trash2Icon /> Eliminar
                    </Button>
                )
            }
        ],
        getCoreRowModel: getCoreRowModel()
    });

    const [articulosTablePagination, setArticulosTablePagination] = usePagination();

    const articulosQuery = usePaginatedQuery<Articulo>({
        url: 'api/articulos',
        queryKey: ['articulos'],
        pagination: articulosTablePagination,
    });

    const articulos = articulosQuery.data?.data ?? [];

    const articulosTable = useAppQueryTable({
        data: articulos,
        columns: [
            ...articuloDefaultColumnsBuilder<Articulo>(row => row),
            {
                id: "selector",
                cell: ({ row }) => {
                    const articulo = row.original;
                    const yaResguardado = articulosResguardadosIds.has(articulo.uuid);
                    return (
                        <Button
                            size="sm"
                            variant={yaResguardado ? 'secondary' : 'default'}
                            disabled={yaResguardado}
                            onClick={() => setArticulosResguardados((prev) => [...prev, { articulo }])}
                        >
                            {yaResguardado ? (
                                <><CheckCircleIcon /> Agregado</>
                            ) : (
                                <><CirclePlusIcon /> Agregar</>
                            )}
                        </Button>
                    );
                }
            }
        ],
        rowCount: articulosQuery.data?.meta.total ?? 0,
        state: { pagination: articulosTablePagination },
        onPaginationChange: setArticulosTablePagination
    });

    const [alertOpen, setAlertOpen] = React.useState(false);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Resguardo de Bienes Informáticos</CardTitle>
                </CardHeader>

                <CardContent>
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
                            </div>

                            <DataTable table={formTable} />

                            <form.Subscribe selector={(state) => state.fieldMeta.articulos?.errors}>
                                {(errors) => errors && <FieldError errors={errors} />}
                            </form.Subscribe>

                            <Button
                                onClick={async () => {
                                    form.validateSync('submit');
                                    await form.validateAsync('submit');
                                    if (!form.state.isValid) return;
                                    setAlertOpen(true);
                                }}
                                className="self-center"
                            >
                                <SaveIcon /> Guardar
                            </Button>

                            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Deseas continuar?</AlertDialogTitle>
                                        <AlertDialogDescription>Verifica que la información sea correcta antes de continuar</AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogAction asChild>
                                            <form.SubmitFormButton onClick={() => form.handleSubmit()} />
                                        </AlertDialogAction>

                                        <AlertDialogCancel>
                                            <CircleXIcon /> Cancelar
                                        </AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </form.AppForm>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Articulos disponibles para resguardo</CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTableLayout table={articulosTable} />
                </CardContent>
            </Card>
        </>
    );
}

export {
    CreateView as CreateResguardoView
}
