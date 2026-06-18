import { withFieldGroup } from "@/components/composed/@tanstack/form";
import { TextField } from "@/components/composed/@tanstack/form-field";
import { FieldGroup as FieldGroupComponent } from "@/components/ui/field";
import type React from "react";
import { defaultValues } from "./form-schema";

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

type FieldGroup = React.ComponentProps<typeof FieldGroupComponent>;
const defaultProps: FieldGroup = {};
export const FieldGroup = withFieldGroup({
    defaultValues,
    props: defaultProps,
    render: ({ group, ...props }) => (
        <FieldGroupComponent {...props}>
            <group.AppField
                name="nombre"
                children={() => <Field />}
            />
        </FieldGroupComponent>
    )
});
