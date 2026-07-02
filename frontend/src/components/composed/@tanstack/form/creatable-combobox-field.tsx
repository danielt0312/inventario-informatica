import * as Root from "../../creatable-combobox-field";
import { useFieldContext } from "./form";

export type CreatableComboboxField = number | undefined;
export interface CreatableComboboxFieldProps extends Root.CreatableComboboxFieldProps {
}
export const CreatableComboboxField = <TValue extends CreatableComboboxField = CreatableComboboxField>({
    value,
    onValueChange,
    ...props
}: CreatableComboboxFieldProps) => {
    const field = useFieldContext<TValue>();

    return (
        <Root.CreatableComboboxField
            value={value === undefined
                ? (field.state.value === undefined ? undefined : String(field.state.value))
                : value
            }
            onValueChange={(v) => onValueChange === undefined
                ? (field.handleChange((v === '' ? undefined : Number(v)) as TValue))
                : onValueChange(v)
            }
            errors={field.state.meta.errors}
            {...props}
        />
    );
};
