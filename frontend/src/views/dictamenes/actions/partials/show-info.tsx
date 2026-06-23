import { FilePreviewWindow } from "@/components/custom/file-preview-window";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DictamenEstadoEnum } from "@/lib/constants";
import type {
    ActionDictamen,
    ActionDictamenWithDocumento
} from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DictamenProducto, DictamenWithDictamenProductos } from "@/types/dictamenes";
import { Card, CardContent } from "@/components/ui/card";

export function ShowInfo({ dictamen }: { dictamen: ActionDictamen<DictamenWithDictamenProductos> }) {
    return (
        <>
            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Número de Dictamen</Label>
                    <Label>{dictamen.id}</Label>
                </div>
                {dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR && (
                    <ShowDocumento dictamen={dictamen as ActionDictamenWithDocumento} />
                )}
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
                    <Label>{dictamen.fecha_solicitud}</Label>
                </div>
            </div>

            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Oficio de Solicitud</Label>
                    <FilePreviewWindow
                        uuid={dictamen.oficio.uuid}
                        title={dictamen.oficio.nombre ?? dictamen.oficio.uuid}
                    />
                </div>
            </div>
        </>
    );
}

export function ShowDocumento({
    dictamen,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    dictamen: ActionDictamenWithDocumento;
}) {
    return (
        <div
            data-slot="label"
            className={cn("col-span-2", className)}
            {...props}
        >
            <Label className="font-bold">Dictamen tecnológico</Label>
            <FilePreviewWindow
                uuid={dictamen.documento.uuid}
                title={dictamen.documento.nombre ?? dictamen.documento.uuid}
            />
        </div>
    );
}

interface ShowProductosProps {
    dictamen: DictamenWithDictamenProductos;
    children: (producto: DictamenProducto, index: number) => React.ReactNode;
}

export function ShowProductos({
    dictamen,
    children
}: ShowProductosProps) {
    return (
        <>
            {dictamen.productos.map((p, index) => {
                <Card key={index} className="shadow-none">
                    <CardContent>
                        <div className="grid grid-cols-3">
                            <div data-slot="label">
                                <Label className="font-bold">Cantidad</Label>
                                <Label>{p.cantidad}</Label>
                            </div>
                        </div>
                        <>AA</>

                        {children(p, index)}
                    </CardContent>
                </Card>
            })}
        </>
    );
}
