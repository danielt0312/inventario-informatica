import type { Archivo } from "@/types/documentos";
import { Attachment, AttachmentAction } from "@/components/ui/attachment";
import { Field, type FieldProps } from "./field";
import { EyeIcon } from "lucide-react";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AttachmentProps extends React.ComponentProps<typeof Attachment> {
}

interface AttachmentFieldProps extends AttachmentProps, Omit<FieldProps, 'orientation'> {
    attachmentOrientation?: AttachmentProps['orientation'];
}
export function AttachmentField({
    className,
    description,
    disabled,
    label,
    required,
    errors,
    orientation,
    attachmentOrientation,
    ...props
}: AttachmentFieldProps) {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <Attachment
                orientation={attachmentOrientation}
                {...props}
            />
        </Field>
    );
}

interface AttachmentFieldActionSeeDocumentProps {
    archivo: Archivo;
    tooltipMessage?: string;
    icon?: React.ReactNode;
}
export function AttachmentFieldActionSeeDocument({
    archivo,
    tooltipMessage = 'Ver documento',
    icon = <EyeIcon />
}: AttachmentFieldActionSeeDocumentProps) {
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
