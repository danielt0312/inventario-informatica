import { InputField } from "@/components/composed/@tanstack/form/input-field";
import React from "react";

export function NombreField({
    label = "Modelo del Producto",
    placeholder = "Ingresa el nombre del modelo del producto",
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
