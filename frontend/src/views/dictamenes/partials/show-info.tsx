import { Label } from "@/components/ui/label";
import { isDetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import { FileTextIcon } from "lucide-react";
import type { DetailedActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { DetailedDictamen, DetailedDictaminadoDictamen } from "@/types/dictamenes";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export const getLabeledVersionTitle = (dictamen: DetailedDictamen) =>
    `Dictamen No. ${dictamen.id}/${dictamen.version_actual.numero_version}`;


export const ShowVersionInfoDictaminado = ({ dictamen }: { dictamen: DetailedDictaminadoDictamen }) => {
    const { mutateAsync } = useFilePreviewWindowMutation();
    const { archivo } = dictamen.version_actual;

    return (
        <Tooltip>
            <TooltipTrigger>
                <Label
                    onClick={async () => {
                        await mutateAsync({ uuid: archivo.uuid, title: archivo.nombre });
                    }}
                    className="text-sm gap-1.5 text-blue-400 underline-offset-4 hover:underline"
                >
                    <FileTextIcon size="14" />{getLabeledVersionTitle(dictamen)}
                </Label>
            </TooltipTrigger>
            <TooltipContent>
                Ver documento
            </TooltipContent>
        </Tooltip>
    );
}

export const ShowVersionInfo = ({ dictamen }: { dictamen: DetailedActionDictamen }) => {
    if (isDetailedActionDictaminadoDictamen(dictamen)) {
        return (<ShowVersionInfoDictaminado dictamen={dictamen} />)
    }

    return (
        <Label className="text-sm">
            {getLabeledVersionTitle(dictamen)}
        </Label>
    );
}
