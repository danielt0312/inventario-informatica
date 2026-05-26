import {
    FormField,
    type FormFieldProps
} from '@/components/composed/form-field';
import { useFieldContext, useFormContext } from './form';
import { Input } from '@/components/ui/input';
import { CreatableCombobox, type CreatableComboboxProps } from '../combobox-creatable';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Save } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn, fromISO } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldLabel } from '@/components/ui/field';
import { DatePicker, type DatePickerProps } from '../date-picker';
import React from 'react';
import { FileUploader } from '../file-uploader';
import type { FileUploadProps } from '@/components/ui/file-upload';
import { Textarea } from '@/components/ui/textarea';
import { type CheckedState } from '@radix-ui/react-checkbox';

export type SubmitButtonProps = Omit<ComponentProps<typeof Button>, 'type' | 'disabled'> & { label?: string }
export const SubmitButton = ({
    label = "Guardar",
    className,
    ...props
}: SubmitButtonProps) => {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    children={(
                        <>
                            {isSubmitting
                                ? <Spinner />
                                : <Save />
                            } {label}
                        </>
                    )}
                    className={cn("max-w-fit self-center", className)}
                    {...props}
                />
            )}
        </form.Subscribe>
    );
}

export const Field = ({
    ...props
}: FormFieldProps) => {
    const field = useFieldContext();

    return (
        <FormField
            errors={field.state.meta.errors}
            {...props}
        />
    );
};

export type OmitProps = Omit<
    FormFieldProps,
    "children" | "onChange" | "onBlur" | "onFocus" | "onClick"
>;

export type FormTextFieldProps = OmitProps & React.ComponentProps<typeof Input>;
export const TextField = ({
    type,
    label,
    className,
    ...props
}: FormTextFieldProps) => {
    const field = useFieldContext<typeof type>();

    return (
        <Field className={className} label={label}>
            <Input
                placeholder="Ingresa un valor"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                {...props}
            />
        </Field>
    );
};

export type CreatableComboboxFieldProps<T extends number | string> =
    OmitProps &
    CreatableComboboxProps & {
        parseValue?: (v: string) => T;
    };
export const CreatableComboboxField = <T extends number | string = number>({
    label,
    enabled,
    parseValue = (v) => Number(v) as T,
    ...props
}: CreatableComboboxFieldProps<T>) => {
    const field = useFieldContext<T>();

    return (
        <Field label={label} data-disabled={enabled}>
            <CreatableCombobox
                value={String(field.state.value)}
                onValueChange={(v) => field.handleChange(parseValue(v))}
                enabled={enabled}
                {...props}
            />
        </Field>
    );
};

export type CheckboxFieldProps =
    OmitProps &
    ComponentProps<typeof Checkbox> & {
        enabled?: boolean;
    };
export const CheckboxField = ({
    label,
    enabled,
    ...props
}: CheckboxFieldProps) => {
    const field = useFieldContext<CheckedState>();

    return (
        <Field data-disabled={enabled} orientation="horizontal">
            <Checkbox
                onCheckedChange={field.handleChange}
                {...props}
            />
            <FieldLabel>{label}</FieldLabel>
        </Field>
    );
}

export type DatePickerFieldProps<T extends Date | string = Date> =
    OmitProps &
    DatePickerProps & {
        parseValue?: (d: Date | undefined) => T
    };
export const DatePickerField = <T extends Date | string = Date>({
    label,
    parseValue = (d) => d as T,
    ...props
}: DatePickerFieldProps<T>) => {
    const field = useFieldContext<T>()

    const dateValue = React.useMemo(() => {
        const v = field.state.value
        if (!v) return undefined
        if (v instanceof Date) return v
        return fromISO(v)
    }, [field.state.value])

    return (
        <Field label={label}>
            <DatePicker
                value={dateValue}
                onValueChange={(d) => field.handleChange(parseValue(d))}
                {...props}
            />
        </Field>
    )
}

export type FileUploaderFieldProps = OmitProps & FileUploadProps;
export const FileUploaderField = ({
    label,
    ...props
}: FileUploaderFieldProps) => {
    const field = useFieldContext<FileUploaderFieldProps['value']>();

    return (
        <Field label={label}>
            <FileUploader
                value={field.state.value}
                onValueChange={field.handleChange}
                {...props}
            />
        </Field>
    );
}

export type TextareaFieldProps = OmitProps & ComponentProps<typeof Textarea>;
export const TextareaField = ({
    label,
    className,
    ...props
}: TextareaFieldProps) => {
    const field = useFieldContext<TextareaFieldProps['value']>();

    return (
        <Field label={label} className={className}>
            <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='Ingresa un valor'
                {...props}
            />
        </Field>
    );
}
