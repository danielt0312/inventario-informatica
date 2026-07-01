import * as Root from "../../date-picker-field";
import { useFieldContext } from "./form";

export const DatePickerField = <T extends Date | string = Date>({
    ...props
}: Root.DatePickerFieldProps<T>) => {
    const field = useFieldContext<T>();

    return (
        <Root.DatePickerField
            value={field.state.value}
            onValueChange={field.handleChange}
            errors={field.state.meta.errors}
            {...props}
        />
    );
}
