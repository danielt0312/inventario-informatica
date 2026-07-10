import * as Root from "../../date-picker-field";
import { useFieldContext } from "./form";

export type DatePickerField = string | undefined;
export const DatePickerField = (props: Root.DatePickerFieldProps<DatePickerField>) => {
    const field = useFieldContext<DatePickerField>();

    return (
        <Root.DatePickerField
            value={field.state.value ?? ''}
            onValueChange={field.handleChange}
            errors={field.state.meta.errors}
            {...props}
        />
    );
}
