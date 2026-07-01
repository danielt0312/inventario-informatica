import { InputField } from "@/components/composed/@tanstack/form/input-field";
import type React from "react";

export type NombreField = string;
export function NombreField({
    label = "Marca del Producto",
    placeholder = "Ingresa el nombre de la marca del producto",
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
