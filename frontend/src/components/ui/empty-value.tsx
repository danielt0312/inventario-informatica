import { cn } from "@/lib/utils";

export const EmptyValue = ({
    className,
    children = 'N/A',
    ...props
}: React.ComponentProps<'span'>) => (
    <span
        className={cn(
            "italic text-muted-foreground",
            className
        )}
        children={children}
        {...props}
    />
)
