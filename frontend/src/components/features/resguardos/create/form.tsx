import type { Articulo } from "@/types/articulos";
import type { TResponse } from "@/types/generics";
import type { DetailedResguardo, ResguardoArticulo } from "@/types/resguardos";
import { Form } from "@/components/ui/form";
import { useAppForm, useFieldContext } from "@/components/ui/form-context";
import { EmpleadoField, type EmpleadoFieldType } from "../../externos/empleados/form-fields";
import { createResguardoDefaultValues, createResguardoValidator, type CreateResguardoSchemaOutput } from "./form-schema";
import { DatePicker } from "@/components/ui/date-picker";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BaseFieldLayout } from "@/components/ui/field-layout";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { articuloDefaultColumnsBuilder } from "@/views/articulos/partials/table-cols";
import { toLocaleDateFormat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppQueryDataTable } from "@/components/ui/query-datatable";
import { CheckCircleIcon, CirclePlusIcon, CircleXIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { usePagination } from "@/hooks/use-pagination";
import { usePaginatedQuery } from "@/hooks/use-paginated-query";
import { DataTableLayout } from "@/components/ui/datatable-layout";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as ResguardoIndexRoute } from "@/routes/_auth/resguardos";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { SubmitButton } from "@/components/ui/submit-button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import React from "react";

type ArticuloResguardado = ResguardoArticulo<Articulo> | {
    id?: undefined;
    articulo: Articulo;
}

const TableSkeleton = () => (
    <>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-18" />
    </>
);

function CreateForm() {
    const navigate = useNavigate();

    const { mutate, isPending } = useFormMutation<DetailedResguardo<Articulo>, CreateResguardoSchemaOutput>({
        method: 'PUT',
        url: (data) => `api/empleados/${data.empleado_id}/resguardo`,
        onSuccess: async (_, __, ___, { client }) => {
            await client.invalidateQueries({ queryKey: ["resguardos"] });
            await navigate({ to: ResguardoIndexRoute.to });
        }
    });

    const form = useAppForm({
        defaultValues: createResguardoDefaultValues,
        validators: {
            onSubmit: createResguardoValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = createResguardoValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    const [alertOpen, setAlertOpen] = React.useState(false);

    return (
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

                        <form.Subscribe selector={(state) => state.values.empleado_id}>
                            {(empleadoId) => empleadoId && (
                                <form.AppField
                                    name="articulos"
                                    children={() => <ResguardoDetalle key={empleadoId} empleadoId={empleadoId} />}
                                />
                            )}
                        </form.Subscribe>

                        <Button
                            className="self-center"
                            onClick={async () => {
                                form.validateSync('submit');
                                await form.validateAsync('submit');
                                if (!form.state.isValid) return;
                                setAlertOpen(true);
                            }}
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
                                        <SubmitButton isSubmitting={isPending} onClick={() => form.handleSubmit()} />
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
    );
}

function ResguardoDetalle({ empleadoId }: { empleadoId: EmpleadoFieldType }) {
    const { data: resguardoActual, isLoading } = useQuery({
        queryKey: ['resguardos', empleadoId],
        queryFn: () => api.get<TResponse<DetailedResguardo<Articulo> | null>>(`api/empleados/${empleadoId}/resguardo`, {
            params: {
                include: [
                    'articulosResguardados.articulo.producto.marca',
                    'articulosResguardados.articulo.producto.tipo.categoria',
                    'articulosResguardados.articulo.estado',
                ]
            }
        }).then(r => r.data.data)
    });

    if (isLoading) return <TableSkeleton />;

    return (
        <ResguardoTablas articulosResguardadosPrevios={resguardoActual?.articulos_resguardados ?? []} />
    );
}

function ResguardoTablas({ articulosResguardadosPrevios }: { articulosResguardadosPrevios: ArticuloResguardado[]; }) {
    const field = useFieldContext<string[] | undefined>();

    const [articulosResguardados, setArticulosResguardados] = React.useState(articulosResguardadosPrevios);

    const articulosResguardadosIds = React.useMemo(
        () => new Set(articulosResguardados.map(ar => ar.articulo.uuid)),
        [articulosResguardados]
    );

    React.useEffect(() => {
        field.setValue(articulosResguardados.map(ar => ar.articulo.uuid));
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

    return (
        <>
            <Label className="font-bold text-lg">Bienes Informáticos Resguardados</Label>
            <DataTable table={formTable} />
            <FieldError errors={field.state.meta.errors} />

            <ArticulosTable
                articulosResguardadosUuids={articulosResguardadosIds}
                onAgregar={(articulo) => setArticulosResguardados((prev) => [...prev, { articulo }])}
            />
        </>
    );
}

function ArticulosTable({
    articulosResguardadosUuids,
    onAgregar
}: {
    articulosResguardadosUuids: Set<string>;
    onAgregar: (articulo: Articulo) => void
}) {
    const [tablePagination, setTablePagination] = usePagination();

    const { data, isLoading } = usePaginatedQuery<Articulo>({
        url: 'api/articulos',
        queryKey: ['articulos'],
        pagination: tablePagination,
    });

    const table = useAppQueryDataTable({
        data: data?.data ?? [],
        columns: [
            ...articuloDefaultColumnsBuilder<Articulo>(row => row),
            {
                id: "actions",
                cell: ({ row }) => {
                    const articulo = row.original;
                    const yaResguardado = articulosResguardadosUuids.has(articulo.uuid);
                    return (
                        <Button
                            size="sm"
                            variant={yaResguardado ? 'secondary' : 'default'}
                            disabled={yaResguardado}
                            onClick={() => onAgregar(articulo)}
                        >
                            {yaResguardado
                                ? <><CheckCircleIcon /> Agregado</>
                                : <><CirclePlusIcon /> Agregar</>}
                        </Button>
                    );
                }
            }
        ],
        rowCount: data?.meta.total ?? 0,
        state: { pagination: tablePagination },
        onPaginationChange: setTablePagination
    });

    if (isLoading) return <TableSkeleton />;

    return (
        <>
            <Label className="font-bold text-lg">Articulos disponibles para resguardar</Label>
            <DataTableLayout table={table} />
        </>
    );
}

export {
    CreateForm as CreateResguardoForm
}
