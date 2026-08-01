import { LinkToFile } from "@/components/composed/link-to-file";
import { Label } from "@/components/ui/label";
import type { DetailedActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export function ShowInfo({ dictamen }: { dictamen: DetailedActionDictamen }) {
    const oficio = dictamen.version_actual.oficio;
    const { uuid, nombre }  = oficio.archivo;

    return (
        <div className="grid grid-cols-3">
            <div data-slot="label-container">
                <Label className="font-bold">Área Solicitante</Label>
                <Label>{dictamen.version_actual.adscripcion?.nombre ?? 'Dirección de Tecnologías de la Información'}</Label>
            </div>
            <div data-slot="label-container">
                <Label className="font-bold">Folio de solicitud</Label>
                <LinkToFile uuid={uuid} title={nombre} label={oficio.folio} />
            </div>
            <div data-slot="label-container">
                <Label className="font-bold">Fecha de solicitud</Label>
                <Label>{dictamen.version_actual.fecha_solicitud}</Label>
            </div>
        </div>
    );
}
