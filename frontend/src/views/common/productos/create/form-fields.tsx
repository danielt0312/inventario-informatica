import { TextField } from "@/components/composed/@tanstack/form/field-components";
import type React from "react";

export function NombreField({
    label = "Modelo del Producto",
    placeholder = "Ingresa el nombre del modelo del producto",
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
