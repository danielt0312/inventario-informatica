import { Label } from "@/components/ui/label";
import type { DetailedDictamen } from "@/types/dictamenes";
import { LinkToFile } from "@/components/ui/link-to-file";
import { dictamenVersionHasArchivo } from "@/routes/_auth/dictamenes/$uuid/-utils";

export const getLabeledVersionTitle = (dictamen: DetailedDictamen) =>
    `Dictamen No. ${dictamen.id}/${dictamen.version_actual.numero_version}`;

export const ShowVersionInfo = ({ dictamen }: { dictamen: DetailedDictamen }) => {
    if (dictamenVersionHasArchivo(dictamen.version_actual)) {
        const { uuid, nombre } = dictamen.version_actual.archivo;

        return <LinkToFile label={getLabeledVersionTitle(dictamen)} uuid={uuid} title={nombre} />;
    }

    return (
        <Label className="text-sm">
            {getLabeledVersionTitle(dictamen)}
        </Label>
    );
}

export const ShowBienesInformaticosTitle = () =>
    <Label className="font-bold text-md">Bienes Informáticos Solicitados</Label>
