import { format } from "date-fns";
import { DatePicker, type DatePickerProps } from "./date-picker";
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout";
import { fromISO } from "@/lib/utils";
import { useFieldContext } from "./form-context";
import React from "react";

type DatePickerFieldType = string | undefined;
interface DatePickerFieldProps extends Omit<DatePickerProps, 'children' | 'disabled' | 'value' | 'onValueChange'>, Omit<CoreFieldLayoutProps, 'children' | 'errors'> {
}
function DatePickerField({
    className, description, disabled, label, required, orientation, ...datePickerFieldProps
}: DatePickerFieldProps) {
    const field = useFieldContext<DatePickerFieldType>();
    const fieldValue = field.state.value;

    const dateValue = React.useMemo(() => {
        if (!fieldValue) return undefined;
        return fromISO(fieldValue);
    }, [fieldValue]);

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            required={required}
            orientation={orientation}
            errors={field.state.meta.errors}
        >
            <DatePicker
                disabled={disabled}
                required={required}
                value={dateValue}
                onValueChange={(date) => field.handleChange(date
                    ? format(date, 'yyyy-MM-dd')
                    : undefined
                )}
                {...datePickerFieldProps}
            />
        </FieldLayout>
    );
}

export {
    type DatePickerProps,
    type DatePickerFieldType,
    DatePickerField,
}
