import { InputField, type InputFieldType } from "@/components/ui/input-field";
import { ProductoMarcaField, type ProductoMarcaFieldType } from "./marca-field";
import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { withFieldGroup } from "@/components/ui/form.shared";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import z from "zod";
import type { BooleanMap } from "@/types/generics";

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

type RequiredFields = BooleanMap<Schema>;

type FieldGroupProps = React.ComponentProps<typeof FieldGroup> & {
    required?: Partial<RequiredFields>;
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
                children={() => (
                    <InputField
                        fieldLayout={{
                            label: "Modelo"
                        }}
                        placeholder="Ingresa el nombre del modelo"
                        required={required?.modelo}
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
    type RequiredFields as ProductoVarianteSpecRequiredFields,
    fieldGroup as ProductoVarianteSpecFieldGroup
}
