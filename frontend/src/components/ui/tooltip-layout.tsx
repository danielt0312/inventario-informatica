import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface Props extends React.ComponentProps<typeof Tooltip> {
    content?: React.ReactNode;
    triggerAsChild?: boolean;
}

const Comp = ({
    children,
    content,
    triggerAsChild = true,
    ...props
}: Props) => (
    <Tooltip {...props}>
        {content && (
            <TooltipContent>
                {content}
            </TooltipContent>
        )}
        <TooltipTrigger asChild={triggerAsChild}>
            {children}
        </TooltipTrigger>
    </Tooltip>
);

export {
    Comp as TooltipLayout,
    type Props as TooltipLayoutProps,
}
