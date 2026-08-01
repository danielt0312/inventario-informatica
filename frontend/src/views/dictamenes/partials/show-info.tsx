import { Label } from "@/components/ui/label";
import { isDetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import type { DetailedActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DetailedDictamen } from "@/types/dictamenes";
import { LinkToFile } from "@/components/composed/link-to-file";

export const getLabeledVersionTitle = (dictamen: DetailedDictamen) =>
    `Dictamen No. ${dictamen.id}/${dictamen.version_actual.numero_version}`;

export const ShowVersionInfo = ({ dictamen }: { dictamen: DetailedActionDictamen }) => {
    if (isDetailedActionDictaminadoDictamen(dictamen)) {
        const { uuid, nombre } = dictamen.version_actual.archivo;

        return <LinkToFile label={getLabeledVersionTitle(dictamen)} uuid={uuid} title={nombre} />;
    }

    return (
        <Label className="text-sm">
            {getLabeledVersionTitle(dictamen)}
        </Label>
    );
}
