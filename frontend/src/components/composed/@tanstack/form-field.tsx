import {
    FormField as FormFieldPrimitive,
    type FormFieldProps as FormFieldPrimitiveProps
} from '@/components/composed/form-field';
import { useFieldContext } from './form';
import { Input } from '@/components/ui/input';
import { CreatableCombobox, type CreatableComboboxProps } from '../combobox-creatable';

export type FormFieldProps = Omit<FormFieldPrimitiveProps, "errors">;

export const FormField = ({
    ...props
}: FormFieldProps) => {
    const field = useFieldContext();

    return (
        <FormFieldPrimitive
            errors={field.state.meta.errors}
            {...props}
        />
    );
};

export type TOmitChildrenProp = Omit<FormFieldProps, "children">

export type FormTextFieldProps = TOmitChildrenProp;

export const FormTextField = ({
    label
}: FormTextFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <FormField label={label}>
            <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
            />
        </FormField>
    );
};

export type FormCreatableComboboxFieldProps = TOmitChildrenProp & CreatableComboboxProps;

export const FormCreatableComboboxField = ({
    label,
    enabled,
    ...props
}: FormCreatableComboboxFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <FormField label={label} data-disabled={enabled}>
            <CreatableCombobox
                value={field.state.value}
                onValueChange={field.handleChange}
                enabled={enabled}
                {...props}
            />
        </FormField>
    );
}
