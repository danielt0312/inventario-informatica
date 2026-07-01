import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { SubmitButton } from './form-components';
import { InputField } from './input-field';
import { CreatableComboboxField } from './creatable-combobox-field';
import { CheckboxField, CheckboxFieldItem } from './checkbox-field';
import { DatePickerField } from './date-picker-field';
import { FileUploaderField } from './file-uploader-field';
import { TextareaField } from './textarea-field';
import { RadioGroupField, RadioGroupFieldItem } from './radio-group-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
        CreatableComboboxField,
        CheckboxField,
        CheckboxFieldItem,
        RadioGroupField,
        RadioGroupFieldItem,
        DatePickerField,
        FileUploaderField,
        TextareaField
    },
    formComponents: {
        SubmitButton
    }
});
