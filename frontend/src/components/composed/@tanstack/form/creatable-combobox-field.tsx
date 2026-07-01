import * as Root from "../../creatable-combobox-field";
import { useFieldContext } from "./form";

export const CreatableComboboxField = (props: Root.CreatableComboboxFieldProps) => {
    const field = useFieldContext<Root.CreatableComboboxFieldProps['value']>();

    return (
        <Root.CreatableComboboxField
            value={field.state.value}
            onValueChange={field.handleChange}
            errors={field.state.meta.errors}
            {...props}
        />
    );
};
