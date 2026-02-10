import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"

function FormProducto() {
    return (
        <FieldSet>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="producto_id">Tipo de producto</FieldLabel>
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default FormProducto
