import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import {
    Field,
    TextField,
    CreatableComboboxField,
    CheckboxField,
    DatePickerField,
    FileUploaderField,
    TextareaField
} from './field-components';
import { SubmitButton } from './form-components';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        Field,
        TextField,
        CreatableComboboxField,
        CheckboxField,
        DatePickerField,
        FileUploaderField,
        TextareaField
    },
    formComponents: {
        SubmitButton
    }
});
