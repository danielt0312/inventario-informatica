import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface TooltipLayoutProps {
    children?: React.ReactNode;
    tooltip?: Omit<React.ComponentProps<typeof Tooltip>, 'children'> & {
        message?: React.ReactNode;
        triggerAsChild?: boolean;
    }
}

function TooltipLayout({
    children,
    tooltip = {},
}: TooltipLayoutProps) {
    const {
        message,
        triggerAsChild = true,
        ...props
    } = tooltip;

    return (
        <Tooltip {...props}>
            {message && (
                <TooltipContent>
                    {message}
                </TooltipContent>
            )}
            <TooltipTrigger asChild={triggerAsChild}>
                {children}
            </TooltipTrigger>
        </Tooltip>
    );
}

export { TooltipLayout }
