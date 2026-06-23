import { FilePreviewWindow } from "@/components/custom/file-preview-window";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DictamenEstadoEnum } from "@/lib/constants";
import type {
    ActionDictamen,
    ActionDictamenWithDocumento
} from "@/routes/_auth/dictamenes/$uuid/-types";

export function ShowInfo({ dictamen }: { dictamen: ActionDictamen }) {
    return (
        <>
            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Número de Dictamen</Label>
                    <Label>{dictamen.id}</Label>
                </div>
                {dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR && (
                    <ShowDocument dictamen={dictamen as ActionDictamenWithDocumento} />
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
                    <Label>{String(dictamen.fecha_solicitud)}</Label>
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
    )
}

export function ShowDocument({
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
    )
}
