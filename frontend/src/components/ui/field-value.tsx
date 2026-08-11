import { Field, FieldLabel } from "./field";
import { Label } from "./label";

export function FieldValue({
    label,
    value,
    ...props
}: Omit<React.ComponentProps<typeof Field>, 'children'> & {
    label: React.ReactNode;
    value: React.ReactNode;
}) {
    return (
        <Field {...props}>
            <FieldLabel className="font-bold">{label}</FieldLabel>
            <Label>{value}</Label>
        </Field>
    );
}
