import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { SubmitButton } from './form-components';
import { InputField } from './input-field';
import { CreatableComboboxField } from './creatable-combobox-field';
import { CheckboxField, CheckboxFieldItem } from './checkbox-field';
import { DatePickerField } from './date-picker-field';
import { TextareaField } from './textarea-field';
import { RadioGroupField, RadioGroupFieldItem } from './radio-group-field';
import { ArchivoAttachmentField } from '@/components/features/archivos/attachment-field';
import { ArchivoUploaderField } from '@/components/features/archivos/uploader-field';

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
        ArchivoAttachmentField,
        ArchivoUploaderField,
        TextareaField
    },
    formComponents: {
        SubmitButton
    }
});
