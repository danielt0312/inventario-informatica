import React from "react";
import { DatePicker, type DatePickerProps } from "./date-picker";
import type { FieldProps } from "./field";
import { fromISO, toISODate } from "@/lib/utils";
import { Field } from "./field";

export type DatePickerField = Date | string | undefined;
export interface DatePickerFieldProps<T extends DatePickerField = Date> extends Omit<DatePickerProps, 'disabled' | 'value' | 'onValueChange'>, FieldProps {
    value?: T;
    onValueChange?: (value: T) => void;
    parseValue?: (d: DatePickerProps['value']) => T;
    disablerMatcher?: DatePickerProps['disabled'];
}
export const DatePickerField = <T extends DatePickerField = Date>({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    value,
    disablerMatcher,
    parseValue = (d) => toISODate(d) as T,
    onValueChange,
    ...props
}: DatePickerFieldProps<T>) => {
    const dateValue = React.useMemo(() => {
        if (!value) return undefined;
        if (value instanceof Date) return value;
        return fromISO(value);
    }, [value]);

    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <DatePicker
                value={dateValue}
                onValueChange={(date) => onValueChange?.(parseValue(date))}
                disabled={disablerMatcher}
                required={required}
                {...props}
            />
        </Field>
    );
}
