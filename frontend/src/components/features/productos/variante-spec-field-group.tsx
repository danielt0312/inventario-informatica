import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { ProductoMarcaField, type ProductoMarcaFieldType } from "./marca-field";
import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { withFieldGroup } from "@/components/ui/form.shared";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { BooleanMap } from "@/types/generics";
import z from "zod";

type Schema = {
    marca_id: ProductoMarcaFieldType;
    modelo: ModeloFieldType;
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

type RequiredFields = BooleanMap<Schema>;

type FieldGroupProps = React.ComponentProps<typeof FieldGroup> & {
    required?: Partial<RequiredFields>;
}

type ModeloFieldType = InputFieldType;

function ModeloField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            fieldLayout={{
                label: "Modelo",
                ...fieldLayout
            }}
            placeholder="Ingresa el nombre del modelo"
            {...props}
        />
    );
}

const fieldGroup = withFieldGroup({
    defaultValues,
    props: {} as FieldGroupProps,
    render: ({ group, className, required, ...props }) => (
        <FieldGroup
            className={cn(
                "flex-row",
                className
            )}
            {...props}
        >
            <group.AppField
                name="marca_id"
                children={() => <ProductoMarcaField layout={{ label: 'Marca' }} required={required?.marca_id} />}
            />

            <group.AppField
                name="modelo"
                children={() => <ModeloField required={required?.modelo} />}
            />
        </FieldGroup>
    )
})

export {
    defaultValues as productoVarianteSpecDefaultFormValues,
    validator as productoVarianteSpecFormValidator,
    type Schema as ProductoVarianteSpecSchema,
    type OutputSchema as ProductoVarianteSpecOutputSchema,
    type RequiredFields as ProductoVarianteSpecRequiredFields,
    type ModeloFieldType as ProductoModeloFieldType,
    fieldGroup as ProductoVarianteSpecFieldGroup,
    ModeloField as ProductoModeloField,
}
