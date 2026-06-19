import { TextField } from "@/components/composed/@tanstack/form-fields";
import type React from "react";

export function Field({
    label = "Categoría de Producto",
    placeholder = "Ingresa el nombre de la categoría de producto",
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
