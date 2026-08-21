import { TooltipButton } from "./tooltip-button";

export const ActionButton = (props?: React.ComponentProps<typeof TooltipButton>) => (
    <TooltipButton
        variant="outline"
        size="icon"
        {...props}
    />
);
