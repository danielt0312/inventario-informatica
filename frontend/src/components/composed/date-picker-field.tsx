import React from "react";
import { DatePicker, type DatePickerProps } from "./date-picker";
import type { FieldProps } from "./field";
import { fromISO } from "@/lib/utils";
import { Field } from "./field";

export interface DatePickerFieldProps<T extends Date | string = Date> extends Omit<DatePickerProps, 'disabled'>, FieldProps {
    parseValue?: (d: DatePickerProps['value']) => T;
    disablerMatcher?: DatePickerProps['disabled'];
}
export const DatePickerField = <T extends Date | string = Date>({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    value,
    disablerMatcher,
    parseValue = (d) => d as T,
    ...props
}: DatePickerFieldProps<T>) => {
    const dateValue = React.useMemo(() => {
        const v = value;
        if (!v) return undefined;
        if (v instanceof Date) return v;
        return fromISO(v);
    }, [value]);

    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <DatePicker
                value={dateValue}
                onValueChange={parseValue}
                disabled={disablerMatcher}
                {...props}
            />
        </Field>
    );
}
