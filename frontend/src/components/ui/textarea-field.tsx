import { FieldLayout, type FieldLayoutProps } from "./field-layout";
import { useFieldContext } from "./form-context";
import { InputGroup, InputGroupTextarea } from "./input-group";

interface CoreTextareaFieldProps extends React.ComponentProps<typeof InputGroupTextarea>, FieldLayoutProps {
}

type CoreTextAreaFieldType = string | undefined | null;

function CoreTextareaField({
    children,
    className,
    required,
    disabled,
    fieldLayout = {},
    ...props
}: CoreTextareaFieldProps) {
    const field = useFieldContext<CoreTextAreaFieldType>();

    return (
        <FieldLayout
            className={className}
            fieldLayout={{
                required,
                disabled,
                errors: field.state.meta.errors,
                ...fieldLayout
            }}
        >
            <InputGroup>
                <InputGroupTextarea
                    // required={required}
                    disabled={disabled}
                    name={field.name}
                    value={field.state.value ?? ''}
                    {...props}
                />
                {children}
            </InputGroup>
        </FieldLayout>
    );
}

type TextareaFieldType = string | undefined;

function TextareaField(props: CoreTextareaFieldProps) {
    const field = useFieldContext<TextareaFieldType>();

    return (
        <CoreTextareaField
            onChange={(e) => {
                const value = e.target.value.trim();
                field.handleChange(value === ''
                    ? undefined
                    : value
                );
            }}
            {...props}
        />
    );
}

type NullableTextareaFieldType = string | null;
function NullableTextareaField(props: CoreTextareaFieldProps) {
    const field = useFieldContext<NullableTextareaFieldType>();

    return (
        <CoreTextareaField
            onChange={(e) => {
                const value = e.target.value.trim();
                field.handleChange(value === ''
                    ? null
                    : value
                )
            }}
            {...props}
        />
    )
}

export {
    type CoreTextareaFieldProps,
    type TextareaFieldType,
    type NullableTextareaFieldType,
    TextareaField,
    NullableTextareaField,
}
