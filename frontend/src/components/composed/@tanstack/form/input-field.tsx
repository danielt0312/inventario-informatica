import * as Root from "../../input-field";
import { useFieldContext } from "./form";

export const InputField = (props: Root.InputFieldProps) => {
    const field = useFieldContext<Root.InputFieldProps['value']>();

    return (
        <Root.InputField
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            errors={field.state.meta.errors}
            {...props}
        />
    );
};
