import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout";
import { useFieldContext } from "./form-context";
import { Textarea } from "./textarea";

type TextareaFieldType = string | undefined;
interface CoreTextareaFieldProps extends Omit<React.ComponentProps<typeof Textarea>, 'children' | 'name' | 'value' | 'onChange'>, Omit<CoreFieldLayoutProps, 'children' | 'errors'> {
}
function TextareaField({
    className, description, disabled, label, required, orientation, ...textareaProps
}: CoreTextareaFieldProps) {
    const field = useFieldContext<TextareaFieldType>();

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <Textarea
                disabled={disabled}
                name={field.name}
                value={field.state.value === undefined
                    ? ''
                    : field.state.value
                }
                onChange={(e) =>
                    field.handleChange(
                        e.target.value.trim() === ''
                            ? undefined
                            : e.target.value
                    )
                }
                {...textareaProps}
            />
        </FieldLayout>
    );
}

type NullableTextareaFieldType = string | null;
function NullableTextareaField({
    className, description, disabled, label, required, orientation, ...textareaProps
}: CoreTextareaFieldProps) {
    const field = useFieldContext<NullableTextareaFieldType>();

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <Textarea
                disabled={disabled}
                name={field.name}
                value={field.state.value === null
                    ? ''
                    : field.state.value
                }
                onChange={(e) => field.handleChange(
                    e.target.value.trim() === ''
                        ? null
                        : e.target.value
                )
                }
                {...textareaProps}
            />
        </FieldLayout>
    )
}

export {
    type CoreTextareaFieldProps,
    type TextareaFieldType,
    type NullableTextareaFieldType,
    TextareaField,
    NullableTextareaField,
}
