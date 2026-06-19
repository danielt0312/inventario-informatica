import { TextField } from "@/components/composed/@tanstack/form/field-components";
import type React from "react";

export function NombreField({
    label = "Tipo de Producto",
    placeholder = "Ingresa el nombre del tipo de producto",
    ...props
}: React.ComponentProps<typeof TextField>) {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            {...props}
        />
    );
}
