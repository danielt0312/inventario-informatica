import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { ProductoMarcaField, type ProductoMarcaFieldType } from "./marca-field";
import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { withFieldGroup } from "@/components/ui/form.shared";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import z from "zod";

type Schema = {
    marca_id: ProductoMarcaFieldType;
    modelo: InputFieldType;
}

const defaultValues: Schema = {
    marca_id: undefined,
    modelo: undefined
}

const validator = z.object({
    marca_id: selectedNumberOption,
    modelo: requiredString
});

type OutputSchema = z.output<typeof validator>;

const fieldGroup = withFieldGroup({
    defaultValues,
    props: {} as React.ComponentProps<typeof FieldGroup>,
    render: ({ group, className, ...props }) => (
        <FieldGroup
            className={cn(
                "flex-row",
                className
            )}
            {...props}
        >
            <group.AppField
                name="marca_id"
                children={() => <ProductoMarcaField required />}
            />

            <group.AppField
                name="modelo"
                children={() => (
                    <InputField
                        fieldLayout={{
                            label: "Modelo"
                        }}
                        placeholder="Ingresa el nombre del modelo"
                        required
                    />
                )}
            />
        </FieldGroup>
    )
})

export {
    defaultValues as productoVarianteSpecDefaultFormValues,
    validator as productoVarianteSpecFormValidator,
    type Schema as ProductoVarianteSpecSchema,
    type OutputSchema as ProductoVarianteSpecOutputSchema,
    fieldGroup as ProductoVarianteSpecFieldGroup
}
