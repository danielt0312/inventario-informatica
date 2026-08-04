import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./form";
import React from "react";
import type { Archivo } from "@/types/documentos";
import { formatFileSize } from "@/lib/utils";
import { Attachment, AttachmentAction, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment";
import { Field, type FieldProps } from "../../field";
import { EyeIcon, UploadIcon } from "lucide-react";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface AttachmentFieldProps extends Omit<React.ComponentProps<typeof Attachment>, 'children'>, Omit<FieldProps, 'orientation' | 'errors'> {
    fieldOrientation?: FieldProps['orientation'];
    initialState?: Archivo;
    attachmentTitle?: string;
    attachmentDescription?: string;
    mediaVariant?: React.ComponentProps<typeof AttachmentMedia>['variant'];
    mediaContent?: React.ReactNode;
}

export type AttachmentField = string | undefined;
export function AttachmentField({
    className,
    description,
    disabled,
    label,
    required,
    fieldOrientation,
    initialState,
    mediaVariant,
    mediaContent = <UploadIcon />,
    attachmentTitle: attachmentTitleProp,
    attachmentDescription: attachmentDescriptionProp,
    ...props
}: AttachmentFieldProps) {
    const field = useFieldContext<AttachmentField>();
    const value = useStore(field.store, (state) => state.value);
    const [archivo, setArchivo] = React.useState<Archivo | undefined>(initialState);

    const attachmentTitle = attachmentTitleProp ?? (
        !!archivo
            ? `${archivo.nombre}.${archivo.extension}`
            : 'Subir archivo'
    );

    const attachmentDescription = attachmentDescriptionProp ?? (
        !!archivo
            ? formatFileSize(archivo.size)
            : 'Presiona aquí para seleccionar un archivo'
    );

    const fieldProps: FieldProps = { className, description, disabled, errors: field.state.meta.errors, label, required, orientation: fieldOrientation };

    return (
        <Field {...fieldProps}>
            <Attachment {...props}>
                <AttachmentMedia variant={mediaVariant}>
                    {mediaContent}
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>{attachmentTitle}</AttachmentTitle>
                    <AttachmentDescription>{attachmentDescription}</AttachmentDescription>
                </AttachmentContent>
                {!value && <AttachmentTrigger onClick={() => inputRef.current?.click()} disabled={disabled} aria-disabled={disabled} />}
                <AttachmentActions>
                    {!!archivo && (
                        <AttachmentActionSeeDocument archivo={archivo} />
                    )}

                    {(!!file || !!archivo) && (
                        <Tooltip>
                            <TooltipContent>
                                Elegir otro archivo
                            </TooltipContent>
                            <TooltipTrigger asChild>
                                <AttachmentAction disabled={status === 'pending'} onClick={() => inputRef.current?.click()}>
                                    <ArrowLeftRightIcon />
                                </AttachmentAction>
                            </TooltipTrigger>
                        </Tooltip>
                    )}
                </AttachmentActions>
            </Attachment>
        </Field>
    );
}

function AttachmentActionSeeDocument({
    archivo,
    tooltipMessage = 'Ver documento',
    icon = <EyeIcon />
}: {
    archivo: Archivo;
    tooltipMessage?: string;
    icon?: React.ReactNode;
}) {
    const { mutate } = useFilePreviewWindowMutation();

    return (
        <Tooltip>
            <TooltipContent>
                {tooltipMessage}
            </TooltipContent>
            <TooltipTrigger asChild>
                <AttachmentAction onClick={() => mutate({ title: archivo.nombre, uuid: archivo.uuid })}>
                    {icon}
                </AttachmentAction>
            </TooltipTrigger>
        </Tooltip>
    );
}
