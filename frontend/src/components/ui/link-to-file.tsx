import { useFilePreviewWindowMutation, type FilePreviewWindowMutationFn } from "@/hooks/use-file-preview-window-mutation";
import { FileTextIcon, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends Omit<React.ComponentProps<'span'>, 'children'> {
    file: FilePreviewWindowMutationFn;
    iconSize?: LucideProps['size'];
    label?: React.ReactNode;
}

function Comp({
    file,
    className,
    label,
    iconSize = 14,
    ...props
}: Props) {
    const { mutate } = useFilePreviewWindowMutation();

    return (
        <span
            data-slot="link-to-file"
            onClick={() => mutate(file)}
            className={cn(
                "flex items-center gap-1 text-sm text-blue-400 underline-offset-4 hover:underline max-w-fit max-h-fit cursor-pointer",
                className
            )}
            {...props}
        >
            <FileTextIcon size={iconSize} />
            {label}
        </span>
    );
}

export {
    Comp as LinkToFile,
    type Props as LinkToFileProps
}
