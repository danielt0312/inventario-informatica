import { TextField } from "@/components/composed/@tanstack/form/field-components";
import type React from "react";

export type NombreField = string;
export function NombreField({
    label = "Marca del Producto",
    placeholder = "Ingresa el nombre de la marca del producto",
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
