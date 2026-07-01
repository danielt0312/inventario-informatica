import * as Root from "../../radio-group-field";
import { useFieldContext } from "./form";

export const RadioGroupField = (props: Root.RadioGroupFieldProps) => {
    const field = useFieldContext<Root.RadioGroupFieldItemProps['value']>();

    return (
        <Root.RadioGroupField
            name={field.name}
            value={field.state.value}
            onValueChange={field.handleChange}
            errors={field.state.meta.errors}
            {...props}
        />
    );
}

export const RadioGroupFieldItem = Root.RadioGroupFieldItem;
