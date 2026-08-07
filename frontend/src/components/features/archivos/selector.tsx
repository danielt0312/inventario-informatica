import type { Archivo } from "@/types/documentos";
import type { QueryClient } from "@tanstack/react-query";
import { formatFileSize } from "@/lib/utils";
import { ArrowLeftRightIcon, EyeIcon, FileTextIcon, UploadIcon } from "lucide-react";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { TooltipAttachmentAction } from "../../ui/tooltip-attachment-action";
import { useArchivoQuery, type UseArchivoQueryOptions } from "./hooks/use-query";
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger, AttachmentActions, AttachmentGroup } from "../../ui/attachment";
import { getFileName } from "./utils";

const getSelectorTitleLabel = (archivo?: Archivo, fallbackLabel: string = 'Adjuntar archivo') =>
    archivo
        ? getFileName(archivo)
        : fallbackLabel;

const SelectorAction = TooltipAttachmentAction;
const SelectorContent = AttachmentContent;
const SelectorTrigger = AttachmentTrigger;
const SelectorActions = AttachmentActions;
const SelectorGroup = AttachmentGroup;

type UseQueryOptions = Omit<UseArchivoQueryOptions, 'enabled' | 'initialData'>;
type SelectorType = Archivo | undefined;

function Selector<TValue extends SelectorType = SelectorType>({
    value,
    query,
    ...props
}: React.ComponentProps<typeof Attachment> & {
    value?: TValue;
    query?: {
        client?: QueryClient;
        options?: UseQueryOptions;
    } | undefined
}) {
    const { data: archivo } = useArchivoQuery(query?.options, query?.client);

    return (
        <Attachment
            state={archivo ? 'done' : 'idle'}
            {...props}
        />
    );
}

function SelectorLayout({
    value,
    onSelectorClick,
    triggererDisabled = false,
    ...props
}: Omit<React.ComponentProps<typeof Selector<Archivo>>, 'children'> & {
    onSelectorClick?: () => void;
    triggererDisabled?: boolean;
}) {
    return (
        <Selector value={value} {...props}>
            <SelectorMedia archivo={value} />
            <SelectorContent>
                <SelectorTitle archivo={value} />
                <SelectorDescription archivo={value} />
            </SelectorContent>
            {value && (
                <SelectorActions>
                    <SelectorActionViewer archivo={value} />
                    <SelectorActionSwitcher onClick={onSelectorClick} />
                </SelectorActions>
            )}
            {!triggererDisabled && <AttachmentTrigger onClick={onSelectorClick} />}
        </Selector>
    );
}

function SelectorMedia({
    archivo,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentMedia>, 'children' | 'variant'> & {
    archivo?: Archivo;
}) {
    return (
        <AttachmentMedia
            variant="icon"
            children={archivo
                ? <FileTextIcon />
                : <UploadIcon />}
            {...props}
        />
    );
};

function SelectorTitle({
    archivo,
    fallbackLabel,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentTitle>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) {
    return (
        <AttachmentTitle
            children={getSelectorTitleLabel(archivo, fallbackLabel)}
            {...props}
        />
    )
};

function SelectorDescription({
    archivo,
    fallbackLabel = 'Presiona aquí para adjuntar un archivo',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentDescription>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) {
    return (
        <AttachmentDescription
            children={
                archivo !== undefined
                    ? formatFileSize(archivo.size)
                    : fallbackLabel
            }
            {...props}
        />
    )
};

function SelectorActionSwitcher({
    tooltipMessage = 'Adjuntar otro archivo',
    icon = <ArrowLeftRightIcon />,
    ...props
}: React.ComponentProps<typeof SelectorAction>) {
    return (
        <SelectorAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            {...props}
        />
    )
};

function SelectorActionViewer({
    archivo,
    tooltipMessage = 'Ver documento',
    icon = <EyeIcon />,
    ...props
}: Omit<React.ComponentProps<typeof SelectorAction>, 'onClick'> & {
    archivo: Archivo;
}) {
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
    getSelectorTitleLabel as getArchivoSelectorTitleLabel,
    Selector as ArchivoSelector,
    SelectorLayout as ArchivoSelectorLayout,
    SelectorMedia as ArchivoSelectorMedia,
    SelectorTitle as ArchivoSelectorTitle,
    SelectorDescription as ArchivoSelectorDescription,
    SelectorAction as ArchivoSelectorAction,
    SelectorActionSwitcher as ArchivoSelectorActionSwitcher,
    SelectorActionViewer as ArchivoSelectorActionViewer,
    SelectorContent as ArchivoSelectorContent,
    SelectorTrigger as ArchivoSelectorTrigger,
    SelectorActions as ArchivoSelectorActions,
    SelectorGroup as ArchivoSelectorGroup
}
