import { useFilePreviewWindowMutation, type FilePreviewWindowMutationFn } from "@/hooks/use-file-preview-window-mutation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Label } from "./label";
import { EyeIcon, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export const LinkToFile = ({
    title,
    uuid,
    label,
    className,
    iconSize = 14,
    tooltipMessage = 'Ver documento',
    ...props
}: FilePreviewWindowMutationFn & Omit<React.ComponentProps<typeof Label>, 'title' | 'children' | 'onClick'> & {
    iconSize?: LucideProps['size'];
    label: string;
    tooltipMessage?: string;
}) => {
    const { mutateAsync } = useFilePreviewWindowMutation();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Label
                    onClick={async () => {
                        await mutateAsync({ uuid, title });
                    }}
                    className={cn("text-sm gap-1 text-blue-400 underline-offset-4 hover:underline w-fit justify-self-start cursor-pointer", className)}
                    {...props}
                >
                    <EyeIcon size={iconSize} />{label}
                </Label>
            </TooltipTrigger>
            <TooltipContent>
                {tooltipMessage}
            </TooltipContent>
        </Tooltip>
    );
}
