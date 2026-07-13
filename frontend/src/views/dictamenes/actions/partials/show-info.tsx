import { FilePreviewWindowGroup } from "@/components/composed/file-preview-window";
import { Label } from "@/components/ui/label";
import type { ActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { isActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";

export function ShowInfo({ dictamen }: { dictamen: ActionDictamen }) {
    return (
        <>
            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Número de Dictamen</Label>
                    <Label>{dictamen.id}</Label>
                </div>

                {isActionDictaminadoDictamen(dictamen) && (
                    <div data-slot="label" className="col-span-2">
                        <Label className="font-bold">Dictamen tecnológico</Label>
                        <FilePreviewWindowGroup
                            uuid={dictamen.documento.uuid}
                            title={dictamen.documento.nombre ?? dictamen.documento.uuid}
                        />
                    </div>
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
                    <FilePreviewWindowGroup
                        uuid={dictamen.oficio.uuid}
                        title={dictamen.oficio.nombre ?? dictamen.oficio.uuid}
                    />
                </div>
            </div>
        </>
    );
}
