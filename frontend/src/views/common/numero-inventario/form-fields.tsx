import { TextField } from "@/components/composed/@tanstack/form/field-components";
import type React from "react";

export type NumeroInventarioField = string;
export const NumeroInventarioField = ({
    label = "Número de Inventario",
    placeholder = "500-01-0000",
    ...props
}: React.ComponentProps<typeof TextField>) => {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            {...props}
        />
    );
}

