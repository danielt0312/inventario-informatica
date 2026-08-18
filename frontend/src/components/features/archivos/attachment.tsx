import * as Root from "../../ui/attachment";
import type { Archivo } from "@/types/documentos";
import { cn, formatFileSize } from "@/lib/utils";
import { ArrowLeftRightIcon, EyeIcon, FileTextIcon, UploadIcon } from "lucide-react";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { TooltipAttachmentAction } from "../../ui/tooltip-attachment-action";
import { getFileName } from "./utils";
import React from "react";

const getAttachmentTitleLabel = (archivo?: Archivo, fallbackLabel: string = 'Adjuntar archivo') =>
    archivo
        ? getFileName(archivo)
        : fallbackLabel;

const AttachmentAction = TooltipAttachmentAction;
const AttachmentContent = Root.AttachmentContent;
const AttachmentActions = Root.AttachmentActions;
const AttachmentTrigger = Root.AttachmentTrigger;
const AttachmentGroup = Root.AttachmentGroup;

const useState = React.useState<AttachmentType>;

type AttachmentType = Archivo | undefined;

function Attachment<TValue extends AttachmentType = AttachmentType>({
    value,
    className,
    ...props
}: Omit<React.ComponentProps<typeof Root.Attachment>, 'value' | 'defaultValue'> & {
    value?: TValue;
}) {
    return (
        <Root.Attachment
            state={value ? 'done' : 'idle'}
            className={cn(
                "w-full",
                className
            )}
            {...props}
        />
    );
}

function AttachmentLayout({
    value,
    disabled,
    onAttachmentClick,
    ...props
}: Omit<React.ComponentProps<typeof Attachment<Archivo>>, 'children'> & {
    onAttachmentClick?: () => void;
}) {
    const hasClickHandler = onAttachmentClick !== undefined;

    return (
        <Attachment value={value} disabled={disabled} {...props}>
            <AttachmentMedia archivo={value} />
            <AttachmentContent>
                <AttachmentTitle archivo={value} />
                <AttachmentDescription archivo={value} />
            </AttachmentContent>
            {value && (
                <AttachmentActions>
                    <AttachmentActionViewer archivo={value} />
                    {hasClickHandler && <AttachmentActionSwitcher onClick={onAttachmentClick} />}
                </AttachmentActions>
            )}
            {hasClickHandler && !disabled && !value && <AttachmentTrigger onClick={onAttachmentClick} />}
        </Attachment>
    );
}

function AttachmentMedia({
    archivo,
    ...props
}: Omit<React.ComponentProps<typeof Root.AttachmentMedia>, 'children' | 'variant'> & {
    archivo?: Archivo;
}) {
    return (
        <Root.AttachmentMedia
            variant="icon"
            children={archivo
                ? <FileTextIcon />
                : <UploadIcon />}
            {...props}
        />
    );
};

function AttachmentTitle({
    archivo,
    fallbackLabel,
    ...props
}: Omit<React.ComponentProps<typeof Root.AttachmentTitle>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) {
    return (
        <Root.AttachmentTitle {...props}>
            {getAttachmentTitleLabel(archivo, fallbackLabel)}
        </Root.AttachmentTitle>
    )
};

function AttachmentDescription({
    archivo,
    fallbackLabel = 'Presiona aquí para adjuntar un archivo',
    ...props
}: Omit<React.ComponentProps<typeof Root.AttachmentDescription>, 'children'> & {
    archivo?: Archivo;
    fallbackLabel?: string;
}) {
    return (
        <Root.AttachmentDescription
            children={
                archivo !== undefined
                    ? formatFileSize(archivo.size)
                    : fallbackLabel
            }
            {...props}
        />
    )
};

function AttachmentActionSwitcher({
    tooltipMessage = 'Adjuntar otro archivo',
    icon = <ArrowLeftRightIcon />,
    ...props
}: React.ComponentProps<typeof AttachmentAction>) {
    return (
        <AttachmentAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            {...props}
        />
    )
};

function AttachmentActionViewer({
    archivo,
    tooltipMessage = 'Ver documento',
    icon = <EyeIcon />,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentAction>, 'onClick'> & {
    archivo: Archivo;
}) {
    const { mutate } = useFilePreviewWindowMutation();

    return (
        <AttachmentAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            onClick={() => mutate({ title: archivo.nombre, uuid: archivo.uuid })}
            {...props}
        />
    );
}

export {
    type AttachmentType as ArchivoAttachmentType,
    useState as useArchivoAttachmentState,
    getAttachmentTitleLabel as getArchivoAttachmentTitleLabel,
    Attachment as ArchivoAttachment,
    AttachmentLayout as ArchivoAttachmentLayout,
    AttachmentMedia as ArchivoAttachmentMedia,
    AttachmentTitle as ArchivoAttachmentTitle,
    AttachmentDescription as ArchivoAttachmentDescription,
    AttachmentAction as ArchivoAttachmentAction,
    AttachmentActionSwitcher as ArchivoAttachmentActionSwitcher,
    AttachmentActionViewer as ArchivoAttachmentActionViewer,
    AttachmentContent as ArchivoAttachmentContent,
    AttachmentTrigger as ArchivoAttachmentTrigger,
    AttachmentActions as ArchivoAttachmentActions,
    AttachmentGroup as ArchivoAttachmentGroup
}
