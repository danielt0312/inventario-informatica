import { InputField } from "@/components/composed/@tanstack/form/input-field";
import type React from "react";

export type NumeroInventarioField = string;
export const NumeroInventarioField = ({
    label = "Número de Inventario",
    placeholder = "500-01-0000",
    ...props
}: React.ComponentProps<typeof InputField>) => {
    return (
        <InputField
            label={label}
            placeholder={placeholder}
            {...props}
        />
    );
}

