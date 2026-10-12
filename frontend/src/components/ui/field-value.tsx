import { Field, FieldLabel } from "./field";
import { Label } from "./label";

interface Props extends React.ComponentProps<typeof Field> {
    label: React.ReactNode;
}

const Comp = ({
    label,
    children,
    ...props
}: Props) => (
    <Field {...props}>
        <FieldLabel className="font-bold">{label}</FieldLabel>
        <Label>{children}</Label>
    </Field>
);

export {
    Comp as FieldValue
}
