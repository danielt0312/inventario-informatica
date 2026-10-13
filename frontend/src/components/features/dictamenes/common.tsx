import type { DetailedDictamen } from "@/types/dictamenes";
import type { Oficio } from "@/types/documentos";
import { LinkToFile } from "@/components/ui/link-to-file";
import { Label } from "@/components/ui/label";
import { toLocaleDateFormat } from "@/lib/utils";
import { dictamenVersionHasArchivo } from "./guards";
import { TooltipLayout } from "@/components/ui/tooltip-layout";
import { FieldValue } from "@/components/ui/field-value";
import { FieldGroup } from "@/components/ui/field";

export const DictamenShowInfo = ({
    dictamen
}: {
    dictamen: DetailedDictamen
}) => (
    <FieldGroup className="grid grid-cols-4">
        <FieldValue label="Área Solicitante" className="col-span-2">
            {dictamen.area.nombre}
        </FieldValue>
        <FieldValue label="Fecha de Solicitud">
            {toLocaleDateFormat(dictamen.version_actual.fecha_solicitud)}
        </FieldValue>
        {dictamen.oficio && <DictamenShowOficioInfo oficio={dictamen.oficio} />}
    </FieldGroup>
);

export const getLabeledVersionTitle = (dictamen: DetailedDictamen) =>
    `Dictamen No. ${dictamen.id}/${dictamen.version_actual.numero_version}`;

export const DictamenShowOficioInfo = ({
    oficio
}: {
    oficio: Oficio
}) => (
    <FieldValue label="Folio de solicitud">
        <TooltipLayout content="Ver Documento">
            <LinkToFile
                label={oficio.folio}
                file={{ title: oficio.archivo.nombre, uuid: oficio.archivo.uuid }}
            />
        </TooltipLayout>
    </FieldValue>
);

export const ShowVersionInfo = ({
    dictamen
}: {
    dictamen: DetailedDictamen;
}) => {
    const label = getLabeledVersionTitle(dictamen);

    if (dictamenVersionHasArchivo(dictamen.version_actual)) {
        return (
            <TooltipLayout content="Ver Documento">
                <LinkToFile
                    label={label}
                    file={{
                        title: dictamen.version_actual.archivo.nombre,
                        uuid: dictamen.version_actual.archivo.nombre
                    }}
                />
            </TooltipLayout>
        );
    }

    return (
        <Label className="text-sm">
            {label}
        </Label>
    );
};

