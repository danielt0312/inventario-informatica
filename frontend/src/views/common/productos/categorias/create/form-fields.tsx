import { InputField } from "@/components/composed/@tanstack/form/input-field";
import type React from "react";

export type NombreField = string;
export function NombreField({
    label = "Categoría de Producto",
    placeholder = "Ingresa el nombre de la categoría de producto",
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            label={label}
            placeholder={placeholder}
            {...props}
        />
    );
}
