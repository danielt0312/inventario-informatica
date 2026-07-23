import { FilePreviewWindowGroup } from "@/components/composed/file-preview-window";
import { Label } from "@/components/ui/label";
import type { DetailedActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { isDetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";

export function ShowInfo({ dictamen }: { dictamen: DetailedActionDictamen }) {
    return (
        <>
            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Número de Dictamen</Label>
                    <Label>{dictamen.id}</Label>
                </div>

                {isDetailedActionDictaminadoDictamen(dictamen) && (
                    <div data-slot="label" className="col-span-2">
                        <Label className="font-bold">Dictamen tecnológico</Label>
                        <FilePreviewWindowGroup
                            uuid={dictamen.version_actual.archivo.uuid}
                            title={dictamen.version_actual.archivo.nombre ?? dictamen.version_actual.archivo.uuid}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Área Solicitante</Label>
                    <Label>{dictamen.version_actual.adscripcion?.nombre ?? 'Dirección de Tecnologías de la Información'}</Label>
                </div>
                <div data-slot="label">
                    <Label className="font-bold">Folio de solicitud</Label>
                    <Label>{dictamen.version_actual.oficio.folio}</Label>
                </div>
                <div data-slot="label">
                    <Label className="font-bold">Fecha de solicitud</Label>
                    <Label>{dictamen.version_actual.fecha_solicitud}</Label>
                </div>
            </div>

            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Oficio de Solicitud</Label>
                    <FilePreviewWindowGroup
                        uuid={dictamen.version_actual.oficio.uuid}
                        title={dictamen.version_actual.oficio.nombre ?? dictamen.version_actual. oficio.uuid}
                    />
                </div>
            </div>
        </>
    );
}
