import { Button } from "./button";
import { TooltipLayout } from "./tooltip-layout";

interface TooltipButtonProps extends React.ComponentProps<typeof TooltipLayout>, React.ComponentProps<typeof Button> {
}

function TooltipButton({
    children,
    tooltip,
    ...props
}: TooltipButtonProps) {
    return (
        <TooltipLayout tooltip={tooltip}>
            <Button {...props}>
                {children}
            </Button>
        </TooltipLayout>
    );
}

export { TooltipButton }
