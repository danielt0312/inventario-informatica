import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";
import { useState } from "react";

export type FacturaField = string | undefined;
export const FacturaField = ({
    label = 'Adjuntar factura',
    buttonLabel = 'Adjuntar',
    buttonIcon = <PaperclipIcon />
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button>
                {buttonIcon} {buttonLabel}
            </Button>
        </>
    );
}
