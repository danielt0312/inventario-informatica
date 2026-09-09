import type { TResponse } from '@/types/generics';
import type { DetailedResguardo } from '@/types/resguardos';
import type { Articulo } from '@/types/articulos';
import { EvidenciarAcuseResguardoForm } from '@/components/features/resguardos/evidenciar-acuse/form';
import { esResguardoEstadoPendienteAcuse } from '@/components/features/resguardos/utils';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router'
import { FieldValue } from '@/components/ui/field-value';
import { toLocaleDateFormat } from '@/lib/utils';
import { FieldGroup } from '@/components/ui/field';
import { ResguardoEstadoBadge } from '@/components/features/resguardos/partials/table-cols';
import { LinkToFile } from '@/components/ui/link-to-file';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { articuloDefaultColumnsBuilder } from '@/views/articulos/partials/table-cols';
import { DataTable } from '@/components/ui/datatable';
import { Label } from '@/components/ui/label';
import GoBackButton from '@/components/Goback';
import api from '@/lib/axios';
import { EmptyValue } from '@/components/ui/empty-value';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const resguardoQueryOptions = (uuid: string) => queryOptions({
    queryKey: ['resguardos', uuid],
    queryFn: () => api.get<TResponse<DetailedResguardo<Articulo>>>(`api/resguardos/${uuid}`)
        .then(r => r.data.data),
});

export const Route = createFileRoute('/_auth/resguardos/$uuid/inspeccionar')({
    component: RouteComponent,
    loader: ({ context, params }) =>
        context.queryClient.ensureQueryData(resguardoQueryOptions(params.uuid))
});

function RouteComponent() {
    const { uuid } = Route.useParams();
    const { data: resguardo }  = useSuspenseQuery(resguardoQueryOptions(uuid));

    const formTable = useReactTable({
        data: resguardo.articulos_resguardados,
        columns: [
            {
                header: "Fecha de Asignación",
                cell: ({ row: { original } }) => toLocaleDateFormat(original.fecha_asignacion)
            },
            ...articuloDefaultColumnsBuilder<(typeof resguardo.articulos_resguardados)[number]>(row => row.articulo),
        ],
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <>
            <GoBackButton />

            <Card>
                <CardHeader>
                    <CardTitle>Información de Resguardo</CardTitle>
                    <CardAction>
                        <ResguardoEstadoBadge estado={resguardo.estado} />
                    </CardAction>
                </CardHeader>

                <CardContent className="flex flex-col gap-7">
                    {esResguardoEstadoPendienteAcuse(resguardo.estado.id) && <EvidenciarAcuseResguardoForm resguardo={resguardo} />}

                    <FieldGroup className="flex-row">
                        <FieldValue
                            label="Resguardante"
                            value={resguardo.empleado.nombre}
                        />
                        <FieldValue
                            label="Fecha de Actualización"
                            value={toLocaleDateFormat(resguardo.fecha_actualizacion)}
                        />
                        <FieldValue
                            label="Fecha de Cancelación"
                            value={
                                resguardo.fecha_cancelacion
                                    ? toLocaleDateFormat(resguardo.fecha_cancelacion)
                                    : <EmptyValue />
                            }
                        />
                    </FieldGroup>

                    <LinkToFile
                        label={"Ver Documento"}
                        title={`${resguardo.archivo.nombre}.${resguardo.archivo.extension}`}
                        uuid={resguardo.archivo.uuid}
                    />

                    <div className="flex flex-row justify-between">
                        <Label className="font-black text-lg">Artículos Resguardados</Label>
                        {/* todo agregar la funcionalidad de redirección hacia `CreateRoute` y cancelar */}
                        {/* <RouterButton to={CreateRoute.to} variant="outline" size="sm">
                            <SquarePenIcon /> Actualizar
                        </RouterButton> */}
                    </div>
                    <DataTable table={formTable} />
                </CardContent>
            </Card>
        </>
    );
}
