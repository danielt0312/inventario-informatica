import { useFieldContext } from "./form"
import * as Root from "../../textarea-field";

export const TextareaField = (props: Root.TextareaFieldProps) => {
    const field = useFieldContext<Root.TextareaFieldProps['value']>()

    return (
        <Root.TextareaField
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            errors={field.state.meta.errors}
            {...props}
        />
    );
}
