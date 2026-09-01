import { LinkToFile } from "@/components/ui/link-to-file";
import { Label } from "@/components/ui/label";
import { toLocaleDateFormat } from "@/lib/utils";
import type { DetailedDictamen } from "@/types/dictamenes";
import type { Oficio } from "@/types/documentos";

export function ShowInfo({ dictamen }: { dictamen: DetailedDictamen }) {
    const { oficio } = dictamen;

    return (
        <div className="grid grid-cols-4">
            <div data-slot="label-container" className="col-span-2">
                <Label className="font-bold">Área Solicitante</Label>
                <Label>{dictamen.adscripcion?.nombre ?? 'Dirección de Tecnologías de la Información'}</Label>
            </div>
            <div data-slot="label-container">
                <Label className="font-bold">Fecha de solicitud</Label>
                <Label>{toLocaleDateFormat(dictamen.version_actual.fecha_solicitud)}</Label>
            </div>
            {oficio && <ShowOficioInfo oficio={oficio} />}
        </div>
    );
}

export const ShowOficioInfo = ({ oficio, ...props }: React.ComponentProps<'div'> & { oficio: Oficio }) => (
    <div data-slot="label-container" {...props}>
        <Label className="font-bold">Folio de solicitud</Label>
        {oficio && <LinkToFile uuid={oficio.archivo.uuid} title={oficio.archivo.nombre} label={oficio.folio} />}
    </div>
);
