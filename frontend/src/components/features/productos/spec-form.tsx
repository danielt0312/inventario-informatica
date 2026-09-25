import { ProductoMarcaField, type ProductoMarcaFieldType } from "./marcas/form-fields";
import { ProductoModeloField, type ProductoModeloFieldType } from "./create/form-fields";
import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import z from "zod";
import { withFieldGroup } from "@/components/ui/app-form";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Schema = {
    marca_id: ProductoMarcaFieldType;
    modelo: ProductoModeloFieldType;
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
                children={() => <ProductoMarcaField />}
            />

            <group.AppField
                name="modelo"
                children={() => <ProductoModeloField />}
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
