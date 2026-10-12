import { Button } from "./button";
import { TooltipLayout, type TooltipLayoutProps } from "./tooltip-layout";

interface Props extends React.ComponentProps<typeof Button> {
    tooltip?: Omit<TooltipLayoutProps, 'children'>;
}

const Comp = ({
    children,
    tooltip: tooltipProps,
    ...props
}: Props) => (
    <TooltipLayout {...tooltipProps}>
        <Button {...props}>
            {children}
        </Button>
    </TooltipLayout>
);

export {
    Comp as TooltipButton,
    type Props as TooltipButtonProps
}
