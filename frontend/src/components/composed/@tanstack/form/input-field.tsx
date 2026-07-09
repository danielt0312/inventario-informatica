import * as Root from "../../input-field";
import { useFieldContext } from "./form";

export type InputField = string | undefined;
export const InputField = ({
    value,
    onChange,
    ...props
}: Root.InputFieldProps) => {
    const field = useFieldContext<InputField>();

    return (
        <Root.InputField
            name={field.name}
            value={value !== undefined
                ? value
                : field.state.value ?? ''}
            onChange={(e) => onChange !== undefined
                ? onChange(e)
                : field.handleChange(
                    e.target.value.trim() !== ''
                        ? e.target.value
                        : undefined
                )
            }
            errors={field.state.meta.errors}
            {...props}
        />
    );
};
