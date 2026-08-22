import { TooltipButton } from "./tooltip-button";

export const ActionRow = (props?: React.ComponentProps<typeof TooltipButton>) => (
    <TooltipButton
        variant="outline"
        size="icon"
        {...props}
    />
);
