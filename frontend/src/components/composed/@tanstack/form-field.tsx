import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import {
    useFieldContext,
    useFormContext
} from "./form";
import { Spinner } from "@/components/ui/spinner";
import { cn, fromISO } from "@/lib/utils";
import {
    FormField,
    type FormFieldProps as TFormFieldProps
} from "../form-field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { DatePicker } from "../date-picker";
import React from "react";
import { FileUploader } from "../file-uploader";
import { Textarea } from "@/components/ui/textarea";
import { CreatableCombobox } from "../creatable-combobox";

export type SubmitButtonProps = &
    Omit<
        React.ComponentProps<typeof Button>,
        'type' | 'disabled' | 'children'
    > & {
        icon?: React.ReactNode;
        label?: string;
        children?: (isSubmitting: boolean) => React.ReactNode;
    }
export const SubmitButton = ({
    label = "Guardar",
    icon = <SaveIcon />,
    className,
    children,
    ...props
}: SubmitButtonProps) => {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => {
                const renderChildren = typeof children === 'function'
                    ? children(isSubmitting)
                    : (
                        <>
                            {isSubmitting
                                ? <Spinner />
                                : icon
                            } {label}
                        </>
                    );

                return (
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        children={renderChildren}
                        className={cn("max-w-fit self-center", className)}
                        {...props}
                    />
                );
            }}
        </form.Subscribe>
    );
}

export type FormFieldProps = Omit<TFormFieldProps, 'orientation'> & {
    fieldOrientation?: TFormFieldProps['orientation'];
};
export const Field = ({
    fieldOrientation,
    ...props
}: FormFieldProps) => {
    const field = useFieldContext();

    return (
        <FormField
            errors={field.state.meta.errors}
            orientation={fieldOrientation}
            {...props}
        />
    );
};

export type OmitGenericProps = Omit<
    FormFieldProps,
    "children" | "onChange" | "onBlur" | "onFocus" | "onClick"
>;

export type TextFieldProps = OmitGenericProps & React.ComponentProps<typeof Input>;
export const TextField = ({
    type,
    label,
    disabled,
    fieldOrientation,
    className,
    ...props
}: TextFieldProps) => {
    const field = useFieldContext<TextFieldProps['value']>();

    return (
        <Field
            label={label}
            data-disabled={disabled}
            fieldOrientation={fieldOrientation}
            className={className}
        >
            <Input
                type={type}
                placeholder="Ingresa un valor"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                {...props}
            />
        </Field>
    );
};

export type CreatableComboboxFieldProps = OmitGenericProps & React.ComponentProps<typeof CreatableCombobox>;
export const CreatableComboboxField = ({
    label,
    disabled,
    fieldOrientation,
    className,
    ...props
}: CreatableComboboxFieldProps) => {
    const field = useFieldContext<CreatableComboboxFieldProps['value']>();

    return (
        <Field
            label={label}
            data-disabled={disabled}
            fieldOrientation={fieldOrientation}
            className={className}
        >
            <CreatableCombobox
                value={field.state.value}
                onValueChange={field.handleChange}
                disabled={disabled}
                {...props}
            />
        </Field>
    );
};

export type TOmitCreatableComboboxFieldsProps<
    O extends keyof CreatableComboboxFieldProps = never
> = Omit<
    CreatableComboboxFieldProps, 'options' | O
>;

export type CheckboxFieldProps = OmitGenericProps & React.ComponentProps<typeof Checkbox>;
export const CheckboxField = ({
    label,
    disabled,
    className,
    fieldOrientation = "horizontal",
    ...props
}: CheckboxFieldProps) => {
    const field = useFieldContext<CheckboxFieldProps['checked']>();

    return (
        <Field
            label={label}
            data-disabled={disabled}
            fieldOrientation={fieldOrientation}
            className={className}
        >
            <Checkbox
                onCheckedChange={field.handleChange}
                disabled={disabled}
                {...props}
            />
            <FieldLabel>{label}</FieldLabel>
        </Field>
    );
}

export type DatePickerFieldProps<T extends Date | string = Date> = OmitGenericProps & React.ComponentProps<typeof DatePicker> & {
    parseValue?: (d: Date | undefined) => T
};
export const DatePickerField = <T extends Date | string = Date>({
    label,
    className,
    fieldOrientation,
    disabled,
    parseValue = (d) => d as T,
    ...props
}: DatePickerFieldProps<T>) => {
    const field = useFieldContext<T>();

    const dateValue = React.useMemo(() => {
        const v = field.state.value;
        if (!v) return undefined;
        if (v instanceof Date) return v;
        return fromISO(v);
    }, [field.state.value]);

    return (
        <Field
            label={label}
            data-disabled={disabled}
            fieldOrientation={fieldOrientation}
            className={className}
        >
            <DatePicker
                value={dateValue}
                onValueChange={(d) => field.handleChange(parseValue(d))}
                {...props}
            />
        </Field>
    );
}

export type FileUploaderFieldProps = OmitGenericProps & React.ComponentProps<typeof FileUploader>;
export const FileUploaderField = ({
    label,
    className,
    fieldOrientation,
    ...props
}: FileUploaderFieldProps) => {
    const field = useFieldContext<FileUploaderFieldProps['value']>();

    return (
        <Field label={label} className={className} fieldOrientation={fieldOrientation}>
            <FileUploader
                value={field.state.value}
                onValueChange={field.handleChange}
                {...props}
            />
        </Field>
    );
}

export type TextareaFieldProps = OmitGenericProps & React.ComponentProps<typeof Textarea>;
export const TextareaField = ({
    label,
    className,
    fieldOrientation,
    ...props
}: TextareaFieldProps) => {
    const field = useFieldContext<TextareaFieldProps['value']>();

    return (
        <Field label={label} className={className} fieldOrientation={fieldOrientation}>
            <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='Ingresa un valor'
                {...props}
            />
        </Field>
    );
}
