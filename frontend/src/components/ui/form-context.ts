import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { ArchivoAttachmentField } from '@/components/features/archivos/attachment-field';
import { ArchivoUploaderField } from '@/components/features/archivos/uploader-field';
import { NullableTextareaField, TextareaField } from '@/components/ui/textarea-field';
import { SubmitFormButton } from '@/components/ui/submit-form-button';
import { InputField } from './input-field';
import { CreatableComboboxField } from './creatable-combobox-field';
import { RadioGroupField, RadioGroupFieldItem } from './radio-group-field';
import { DatePickerField } from './date-picker-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
        CreatableComboboxField,
        RadioGroupField,
        RadioGroupFieldItem,
        DatePickerField,
        ArchivoAttachmentField,
        ArchivoUploaderField,
        TextareaField,
        NullableTextareaField
    },
    formComponents: {
        SubmitFormButton
    }
});
