import { EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { Spinner } from "../ui/spinner";

interface FilePreviewWindowProps {
    uuid?: string;
    title?: string;
    icon?: React.ReactNode;
    loaderIcon?: React.ReactNode;
    onClick?: (mutation: ReturnType<typeof useFilePreviewWindowMutation>) => void;
    children?: React.ReactNode;
}

export function FilePreviewWindow({
    uuid,
    title,
    onClick,
    children,
    icon = <EyeIcon />,
    loaderIcon = <Spinner />,
}: FilePreviewWindowProps) {
    const mutation = useFilePreviewWindowMutation();
    const disabled = uuid === undefined;

    return (
        <Button
            size="icon"
            onClick={() => onClick !== undefined
                ? onClick(mutation)
                : !disabled
                    ? mutation.mutate({ uuid, title })
                    : undefined
            }
            disabled={disabled}
            children={children !== undefined
                ? children
                : mutation.isPending
                    ? loaderIcon
                    : icon

            }
        />
    );
}

export function FilePreviewWindowGroup({
    title,
    onPreviewFileClick: onPreviewClick,
    onClick,
    tooltipMessage = 'Ver documento',
    children,
    previewFileChildren,
    ...props
}: Omit<FilePreviewWindowProps, 'onClick'> & {
    tooltipMessage?: React.ReactNode;
    onClick?: React.ComponentProps<typeof Button>['onClick'];
    onPreviewFileClick?: FilePreviewWindowProps['onClick'];
    previewFileChildren?: FilePreviewWindowProps['children'];
}) {
    return (
        <ButtonGroup>
            <Button
                variant="outline"
                children={children !== undefined
                    ? children
                    : title
                }
                onClick={onClick}
            />
            <FilePreviewWindow
                title={title}
                onClick={onPreviewClick}
                children={previewFileChildren}
                {...props}
            />
        </ButtonGroup>
    );
}
