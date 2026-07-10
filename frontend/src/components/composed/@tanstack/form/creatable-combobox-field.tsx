import * as Root from "../../creatable-combobox-field";
import { useFieldContext } from "./form";

export type CreatableComboboxField = number | undefined;
export const CreatableComboboxField = (props: Root.CreatableComboboxFieldProps) => {
    const field = useFieldContext<CreatableComboboxField>();

    return (
        <Root.CreatableComboboxField
            value={field.state.value === undefined ? undefined : String(field.state.value)}
            onValueChange={(v) => field.handleChange(v === '' ? undefined : Number(v))}
            errors={field.state.meta.errors}
            {...props}
        />
    );
};
