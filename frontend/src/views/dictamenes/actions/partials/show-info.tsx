import { FilePreviewWindow } from "@/components/custom/file-preview";
import { Label } from "@/components/ui/label";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import type { ValidatedDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";
import type { ValidatedDictamen as EvidenciarValidatedDictamen } from "../evidenciar/form-schema";
import { cn } from "@/lib/utils";
import { DictamenEstadoEnum } from "@/lib/constants";

export function ShowInfo({ dictamen }: { dictamen: ValidatedDictamen }) {
    const { mutate: previewOficio } = useFilePreviewWindowMutation(dictamen.oficio.documento.uuid);

    return (
        <>
            <div className="grid grid-cols-3">
                <div data-slot="label">
                    <Label className="font-bold">Número de Dictamen</Label>
                    <Label>{dictamen.id}</Label>
                </div>
                {dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR && (
                    <ShowDocument dictamen={dictamen as EvidenciarValidatedDictamen} />
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
                        label={dictamen.oficio.documento.nombre}
                        onClick={previewOficio}
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
    dictamen: EvidenciarValidatedDictamen;
}) {
    const { mutate: previewDictamen } = useFilePreviewWindowMutation(dictamen.documento.uuid);

    return (
        <div
            data-slot="label"
            className={cn("col-span-2", className)}
            {...props}
        >
            <Label className="font-bold">Dictamen tecnológico</Label>
            <FilePreviewWindow
                label={dictamen.documento.nombre}
                onClick={previewDictamen}
            />
        </div>
    )
}
