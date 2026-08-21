import { RouterButton } from "./router-button";
import { TooltipButton } from "./tooltip-button";

export const ActionTableRow = (props?: React.ComponentProps<typeof TooltipButton>) => (
    <TooltipButton
        variant="outline"
        size="icon"
        {...props}
    />
);

export const RouterActionTableRow = (props?: React.ComponentProps<typeof RouterButton>) => (
    <RouterButton
        variant="outline"
        size="icon"
        {...props}
    />
);
