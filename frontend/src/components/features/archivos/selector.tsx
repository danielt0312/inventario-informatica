import type { Archivo } from "@/types/documentos";
import type { QueryClient } from "@tanstack/react-query";
import { formatFileSize } from "@/lib/utils";
import { ArrowLeftRightIcon, EyeIcon, FileTextIcon, UploadIcon } from "lucide-react";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { TooltipAttachmentAction } from "../../ui/tooltip-attachment-action";
import { useArchivoQuery, type UseArchivoQueryOptions } from "./queries";
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger, AttachmentActions, AttachmentGroup } from "../../ui/attachment";
import { getFileName } from "./utils";

type UseQueryOptions = Omit<UseArchivoQueryOptions, 'enabled' | 'initialData'>;

type SelectorType = Archivo | undefined;
interface SelectorProps<TValue extends SelectorType = SelectorType> extends React.ComponentProps<typeof Attachment> {
    value?: TValue;
    query?: {
        client?: QueryClient;
        options?: UseQueryOptions;
    } | undefined
}
function Selector<TValue extends SelectorType = SelectorType>({
    value,
    query,
    ...props
}: SelectorProps<TValue>) {
    const { data: archivo } = useArchivoQuery(query?.options, query?.client);

    return (
        <Attachment
            state={archivo ? 'done' : 'idle'}
            {...props}
        />
    );
}

const SelectorMedia = ({
    archivo,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentMedia>, 'children' | 'variant'> & {
    archivo?: Archivo;
}) => (
    <AttachmentMedia
        variant="icon"
        children={archivo
            ? <FileTextIcon />
            : <UploadIcon />}
        {...props}
    />
);

const getSelectorTitleLabel = (archivo?: Archivo, fallbackLabel: string = 'Adjuntar archivo') =>
    archivo
        ? getFileName(archivo)
        : fallbackLabel;

const SelectorTitle = ({
    archivo,
    fallbackLabel,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentTitle>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) => (
    <AttachmentTitle
        children={getSelectorTitleLabel(archivo, fallbackLabel)}
        {...props}
    />
);

const SelectorDescription = ({
    archivo,
    fallbackLabel = 'Presiona aquí para adjuntar un archivo',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentDescription>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) => (
    <AttachmentDescription
        children={
            archivo !== undefined
                ? formatFileSize(archivo.size)
                : fallbackLabel
        }
        {...props}
    />
);

const SelectorAction = TooltipAttachmentAction;

const SelectorActionSwitcher = ({
    tooltipMessage = 'Adjuntar otro archivo',
    icon = <ArrowLeftRightIcon />,
    ...props
}: React.ComponentProps<typeof SelectorAction>) => (
    <SelectorAction
        tooltipMessage={tooltipMessage}
        icon={icon}
        {...props}
    />
);

const SelectorActionViewer = ({
    archivo,
    tooltipMessage = 'Ver documento',
    icon = <EyeIcon />,
    ...props
}: Omit<React.ComponentProps<typeof SelectorAction>, 'onClick'> & {
    archivo: Archivo;
}) => {
    const { mutate } = useFilePreviewWindowMutation();

    return (
        <SelectorAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            onClick={() => mutate({ title: archivo.nombre, uuid: archivo.uuid })}
            {...props}
        />
    );
}

export {
    type SelectorType as ArchivoSelectorType,
    Selector as ArchivoSelector,
    SelectorMedia as ArchivoSelectorMedia,
    getSelectorTitleLabel as getArchivoSelectorTitleLabel,
    SelectorTitle as ArchivoSelectorTitle,
    SelectorDescription as ArchivoSelectorDescription,
    SelectorAction as ArchivoSelectorAction,
    SelectorActionSwitcher as ArchivoSelectorActionSwitcher,
    SelectorActionViewer as ArchivoSelectorActionViewer,
    AttachmentContent as ArchivoSelectorContent,
    AttachmentTrigger as ArchivoSelectorTrigger,
    AttachmentActions as ArchivoSelectorActions,
    AttachmentGroup as ArchivoSelectorGroup
}
