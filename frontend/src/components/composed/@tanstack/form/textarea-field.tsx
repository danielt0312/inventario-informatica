import { useFieldContext } from "./form"
import * as Root from "../../textarea-field";

type TextareaFieldValue = string;

export type TextareaField = TextareaFieldValue | undefined;
export const TextareaField = ({
    value,
    onChange,
    ...props
}: Root.TextareaFieldProps) => {
    const field = useFieldContext<TextareaField>();

    return (
        <Root.TextareaField
            name={field.name}
            value={value !== undefined
                ? value
                : field.state.value === undefined
                    ? ''
                    : field.state.value
            }
            onChange={(e) => onChange !== undefined
                ? onChange(e)
                : field.handleChange(
                    e.target.value.trim() === ''
                        ? undefined
                        : e.target.value
                )
            }
            errors={field.state.meta.errors}
            {...props}
        />
    );
}

export type NullableTextareaField = TextareaFieldValue | null;
export const NullableTextareaField = ({
    value,
    onChange,
    ...props
}: React.ComponentProps<typeof TextareaField>) => {
    const field = useFieldContext<NullableTextareaField>();

    return (
        <TextareaField
            value={
                value !== undefined
                    ? value
                    : field.state.value === null
                        ? ''
                        : field.state.value
            }
            onChange={(e) => onChange !== undefined
                ? onChange(e)
                : field.handleChange(
                    e.target.value.trim() === ''
                        ? null
                        : e.target.value
                )
            }
            {...props}
        />
    )
};
