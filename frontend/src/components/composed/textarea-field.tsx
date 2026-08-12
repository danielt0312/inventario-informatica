import { Textarea } from "../ui/textarea";
import { FieldLayout, type CoreFieldLayoutProps } from "../ui/field-layout";

export interface TextareaFieldProps extends Omit<React.ComponentProps<typeof Textarea>, 'children'>, CoreFieldLayoutProps {
}
export const TextareaField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: TextareaFieldProps) => {
    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <FieldLayout {...fieldProps}>
            <Textarea
                disabled={disabled}
                required={required}
                {...props}
            />
        </FieldLayout>
    );
}
