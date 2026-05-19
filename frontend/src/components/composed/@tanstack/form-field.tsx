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
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldLabel } from '@/components/ui/field';

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

export type FieldProps = Omit<FormFieldProps, "errors">;
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

export type OmitProps = Omit<FormFieldProps, "children">;

export type FormTextFieldProps = OmitProps & React.ComponentProps<typeof Input>;
export const TextField = ({
    type,
    label,
    ...props
}: FormTextFieldProps) => {
    const field = useFieldContext<typeof type>();

    return (
        <Field label={label}>
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
    const field = useFieldContext<boolean | 'indeterminate'>();

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
