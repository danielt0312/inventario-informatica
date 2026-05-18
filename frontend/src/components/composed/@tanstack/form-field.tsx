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

export type TOmitChildrenProp = Omit<FormFieldProps, "children">

export type FormTextFieldProps = TOmitChildrenProp;
export const TextField = ({
    label
}: FormTextFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <Field label={label}>
            <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
            />
        </Field>
    );
};

export type CreatableComboboxFieldProps<T extends number | string> =
    TOmitChildrenProp &
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
