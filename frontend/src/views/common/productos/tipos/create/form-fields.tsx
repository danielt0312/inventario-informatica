import { InputField } from "@/components/composed/@tanstack/form/input-field";
import React from "react";

export type NombreField = InputField;
export function NombreField({
    label = "Tipo de Producto",
    placeholder = "Ingresa el nombre del tipo de producto",
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
