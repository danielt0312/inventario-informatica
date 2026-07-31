import { useFilePreviewWindowMutation, type FilePreviewWindowMutationFn } from "@/hooks/use-file-preview-window-mutation";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

type Mutation = ReturnType<typeof useFilePreviewWindowMutation>;

interface FileViewerProps extends Partial<FilePreviewWindowMutationFn>, Omit<React.ComponentProps<typeof Button>, 'children' | 'onClick' | 'title'> {
    icon: (status: Mutation['status']) => React.ReactNode;
    onClick?: (mutation: Pick<Mutation, 'mutate' | 'mutateAsync'>) => void;
    tooltipMessage?: string;
    htmlTitle?: React.ComponentProps<typeof Button>['title'];
}

const FileViewer = ({
    uuid,
    title,
    onClick,
    icon,
    htmlTitle,
    tooltipMessage,
    disabled,
    className,
    ...props
}: FileViewerProps) => {
    const mutation = useFilePreviewWindowMutation();
    const isDisabled = disabled || uuid === undefined;

    return (
        <Tooltip>
            <TooltipContent>
                {tooltipMessage}
            </TooltipContent>
            <TooltipTrigger asChild>
                <Button
                    className={cn("disabled:pointer-events-auto disabled:cursor-not-allowed", className)}
                    disabled={isDisabled}
                    onClick={
                        isDisabled
                            ? undefined
                            : () =>
                                onClick !== undefined
                                    ? onClick(mutation)
                                    : mutation.mutate({ uuid, title: title || uuid })
                    }
                    children={icon(mutation.status)}
                    title={htmlTitle}
                    {...props}
                />
            </TooltipTrigger>
        </Tooltip>
    );
};

interface FileSelectorProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
    label: string;
    icon: React.ReactNode;
}

const FileSelector = ({
    label,
    icon,
    variant = "outline",
    size = "icon",
    ...props
}: FileSelectorProps) => (
    <Button
        variant={variant}
        size={size}
        children={
            <>
                {icon} {label}
            </>
        }
        {...props}
    />
);

interface FileViewerSelectorProps extends Partial<FilePreviewWindowMutationFn> {
    selector: FileSelectorProps;
    viewer: FileViewerProps;
}

const FileViewerSelector = ({ uuid, title, selector, viewer }: FileViewerSelectorProps) => {
    const { className: selectorClassName, ...selectorProps } = selector ?? {};

    return (
        <ButtonGroup>
            <FileSelector
                className={cn("grow", selectorClassName)}
                {...selectorProps}
            />
            <FileViewer
                title={title ?? uuid}
                uuid={uuid}
                {...viewer}
            />
        </ButtonGroup>
    );
};

export { FileViewerSelector }
