import { LinkToFile } from "@/components/ui/link-to-file";
import { Label } from "@/components/ui/label";
import { toLocaleDateFormat } from "@/lib/utils";
import type { DetailedDictamen } from "@/types/dictamenes";
import type { Oficio } from "@/types/documentos";
import { dictamenVersionHasArchivo } from "./helpers";

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

export const getLabeledVersionTitle = (dictamen: DetailedDictamen) =>
    `Dictamen No. ${dictamen.id}/${dictamen.version_actual.numero_version}`;

export const ShowOficioInfo = ({ oficio, ...props }: React.ComponentProps<'div'> & { oficio: Oficio }) => (
    <div data-slot="label-container" {...props}>
        <Label className="font-bold">Folio de solicitud</Label>
        {oficio && <LinkToFile uuid={oficio.archivo.uuid} title={oficio.archivo.nombre} label={oficio.folio} />}
    </div>
);export const ShowVersionInfo = ({ dictamen }: { dictamen: DetailedDictamen; }) => {
    if (dictamenVersionHasArchivo(dictamen.version_actual)) {
        const { uuid, nombre } = dictamen.version_actual.archivo;

        return <LinkToFile label={getLabeledVersionTitle(dictamen)} uuid={uuid} title={nombre} />;
    }

    return (
        <Label className="text-sm">
            {getLabeledVersionTitle(dictamen)}
        </Label>
    );
};

