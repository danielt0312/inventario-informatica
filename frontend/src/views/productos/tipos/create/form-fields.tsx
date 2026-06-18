import { withFieldGroup } from "@/components/composed/@tanstack/form";
import { TextField } from "@/components/composed/@tanstack/form-field";
import { FieldGroup as FieldGroupComponent } from "@/components/ui/field";
import type React from "react";
import { defaultValues } from "./form-schema";
import { cn } from "@/lib/utils";
import { FieldGroup as CategoriaFieldGroup } from "../../categorias/partials/form-fields";

export function Field({
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

type FieldGroup = React.ComponentProps<typeof FieldGroupComponent>;
const defaultProps: FieldGroup = {};
export const FieldGroup = withFieldGroup({
    defaultValues,
    props: defaultProps,
    render: ({ group, className, ...props }) => (
        <FieldGroupComponent
            {...props}
            className={cn("grid grid-cols-2", className)}
        >
            <CategoriaFieldGroup
                form={group.form}
                fields={{
                    id: "categoria_id"
                }}
            />

            <group.AppField
                name="nombre"
                children={() => <FieldGroupComponent />}
            />
        </FieldGroupComponent>
    )
});
