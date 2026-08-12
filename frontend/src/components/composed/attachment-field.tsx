import type { Archivo } from "@/types/documentos";
import { Attachment, AttachmentAction } from "@/components/ui/attachment";
import { FieldLayout, type CoreFieldLayoutProps } from "../ui/field-layout";
import { EyeIcon } from "lucide-react";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AttachmentProps extends React.ComponentProps<typeof Attachment> {
}

interface AttachmentFieldProps extends AttachmentProps, Omit<CoreFieldLayoutProps, 'orientation'> {
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
    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <FieldLayout {...fieldProps}>
            <Attachment
                orientation={attachmentOrientation}
                {...props}
            />
        </FieldLayout>
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
