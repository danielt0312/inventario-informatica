import React from "react";
import { DatePicker, type DatePickerProps } from "../ui/date-picker";
import type { CoreFieldLayoutProps } from "../ui/field-layout";
import { fromISO, toISODate } from "@/lib/utils";
import { FieldLayout } from "../ui/field-layout";

export type DatePickerField = Date | string | undefined;
export interface DatePickerFieldProps<T extends DatePickerField = Date> extends Omit<DatePickerProps, 'disabled' | 'value' | 'onValueChange'>, CoreFieldLayoutProps {
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
    parseValue = (d) => toISODate(d) as T,
    onValueChange,
    ...props
}: DatePickerFieldProps<T>) => {
    const dateValue = React.useMemo(() => {
        if (!value) return undefined;
        if (value instanceof Date) return value;
        return fromISO(value);
    }, [value]);

    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <FieldLayout {...fieldProps}>
            <DatePicker
                value={dateValue}
                onValueChange={(date) => onValueChange?.(parseValue(date))}
                disabled={disabled}
                required={required}
                {...props}
            />
        </FieldLayout>
    );
}
