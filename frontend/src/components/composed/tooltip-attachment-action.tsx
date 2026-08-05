import { AttachmentAction } from "../ui/attachment";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface TooltipAttachmentActionProps extends Omit<React.ComponentProps<typeof AttachmentAction>, 'children'> {
    tooltipMessage?: string;
    icon?: React.ReactNode;
}

export function TooltipAttachmentAction({
    tooltipMessage,
    icon,
    ...props
}: TooltipAttachmentActionProps) {
    return (
        <Tooltip>
            <TooltipContent>
                {tooltipMessage}
            </TooltipContent>
            <TooltipTrigger asChild>
                <AttachmentAction {...props}>
                    {icon}
                </AttachmentAction>
            </TooltipTrigger>
        </Tooltip>
    );
}
