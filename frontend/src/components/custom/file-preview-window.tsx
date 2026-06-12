import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";

export interface FilePreviewWindowProps
    extends React.ComponentProps<typeof Button> {
    uuid: string;
    title?: string;
    tooltipMessage?: React.ReactNode;
    previewButtonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick'> & {
        onClick?: (mutation: ReturnType<typeof useFilePreviewWindowMutation>) => void
    }
}

export function FilePreviewWindow({
    uuid,
    title,
    tooltipMessage = 'Ver documento',
    previewButtonProps,
    ...props
}: FilePreviewWindowProps) {
    const mutation = useFilePreviewWindowMutation();

    const previewButtonClickFn = previewButtonProps?.onClick ?? (() => mutation.mutate({ uuid, title }));

    return (
        <ButtonGroup>
            <Button
                variant="outline"
                children={title}
                {...props}
            />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        children={<Eye />}
                        {...previewButtonProps}
                        onClick={() => previewButtonClickFn(mutation)}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    {tooltipMessage}
                </TooltipContent>
            </Tooltip>
        </ButtonGroup>
    );
}
