import type { Archivo } from "@/types/documentos";
import { formatFileSize } from "@/lib/utils";
import { ArrowLeftRightIcon, EyeIcon, FileTextIcon, UploadIcon } from "lucide-react";
import * as Root from "@/components/ui/attachment";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { TooltipAttachmentAction } from "./tooltip-attachment-action";
import { useArchivoQuery, type ArchivoUuid, type UseArchivoQueryOptions } from "@/views/common/archivos/queries";

type UseAttachmentQueryOptions = Omit<UseArchivoQueryOptions, 'enabled'> & {
    fetchWhenValuesDiverges?: boolean;
}
export const useAttachmentQuery = (
    uuid?: ArchivoUuid,
    options: UseAttachmentQueryOptions = {}
) => {
    const {
        fetchWhenValuesDiverges = true,
        initialData = undefined,
        ...restOptions
    } = options;

    const archivo = typeof initialData === 'function'
        ? initialData()
        : initialData;

    const valuesDiverges = uuid !== undefined && uuid !== archivo?.uuid;

    return useArchivoQuery(uuid, {
        initialData: archivo,
        enabled: fetchWhenValuesDiverges && valuesDiverges,
        ...restOptions
    });
}

export type Attachment = string | undefined;
interface AttachmentProps extends Omit<React.ComponentProps<typeof Root.Attachment>, 'children' | 'onClick'> {
    archivoValue?: Archivo;
    value?: Attachment;
    onSelector?: () => void;
    disabled?: boolean;
    fetchWhenValuesDiverges?: boolean;
}
export function Attachment({
    archivoValue,
    value,
    onSelector,
    disabled,
    state,
    fetchWhenValuesDiverges = true,
    ...props
}: AttachmentProps) {
    const { data: archivo } = useAttachmentQuery(value, {
        initialData: archivoValue
    });

    const hasArchivo = archivo !== undefined;

    return (
        <Root.Attachment
            state={state !== undefined
                ? state
                : hasArchivo
                    ? 'done'
                    : 'idle'}
            {...props}
        >
            <AttachmentMedia archivo={archivo} />

            <Root.AttachmentContent>
                <AttachmentTitle archivo={archivo} />
                <AttachmentDescription archivo={archivo} />
            </Root.AttachmentContent>

            {!hasArchivo && <Root.AttachmentTrigger onClick={onSelector} disabled={disabled} aria-disabled={disabled} />}

            {hasArchivo && (
                <Root.AttachmentActions>
                    <AttachmentActionSeeDocument archivo={archivo} />
                    <AttachmentActionSelector onClick={onSelector} />
                </Root.AttachmentActions>
            )}
        </Root.Attachment>
    );
}

export const AttachmentMedia = ({
    archivo,
    fallbackLabel = 'Adjuntar archivo',
    ...props
}: Omit<React.ComponentProps<typeof Root.AttachmentMedia>, 'children' | 'variant'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) => (
    <Root.AttachmentMedia
        variant="icon"
        children={
            archivo !== undefined
                ? <FileTextIcon />
                : <UploadIcon />
        }
        {...props}
    />
);

export const AttachmentTitle = ({
    archivo,
    fallbackLabel = 'Adjuntar archivo',
    ...props
}: Omit<React.ComponentProps<typeof Root.AttachmentTitle>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) => (
    <Root.AttachmentTitle
        children={
            archivo !== undefined
                ? `${archivo.nombre}.${archivo.extension}`
                : fallbackLabel
        }
        {...props}
    />
);

export const AttachmentDescription = ({
    archivo,
    fallbackLabel = 'Adjuntar archivo',
    ...props
}: Omit<React.ComponentProps<typeof Root.AttachmentTitle>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) => (
    <Root.AttachmentDescription
        children={
            archivo !== undefined
                ? formatFileSize(archivo.size)
                : 'Presiona aquí para adjuntar un archivo'
        }
        {...props}
    />
);

export const AttachmentActionSelector = ({
    tooltipMessage = 'Adjuntar otro archivo',
    icon = <ArrowLeftRightIcon />,
    ...props
}: React.ComponentProps<typeof TooltipAttachmentAction>) => (
    <TooltipAttachmentAction
        tooltipMessage={tooltipMessage}
        icon={icon}
        {...props}
    />
);

export const AttachmentActionSeeDocument = ({
    archivo,
    tooltipMessage = 'Ver documento',
    icon = <EyeIcon />,
    ...props
}: Omit<React.ComponentProps<typeof TooltipAttachmentAction>, 'onClick'> & {
    archivo: Archivo;
}) => {
    const { mutate } = useFilePreviewWindowMutation();

    return (
        <TooltipAttachmentAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            onClick={() => mutate({ title: archivo.nombre, uuid: archivo.uuid })}
            {...props}
        />
    );
}
