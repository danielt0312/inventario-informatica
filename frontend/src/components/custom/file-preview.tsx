import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function FilePreviewWindow({
    label,
    onClick
}: {
    label: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <ButtonGroup>
            <Button
                type="button"
                variant="outline"
                onClick={onClick}
            >
                {label}
            </Button>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        onClick={onClick}
                    >
                        <Eye />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Ver
                </TooltipContent>
            </Tooltip>
        </ButtonGroup>
    );
}
