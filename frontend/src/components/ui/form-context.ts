import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { ArchivoAttachmentField } from '@/components/features/archivos/attachment-field';
import { ArchivoUploaderField } from '@/components/features/archivos/uploader-field';
import { NullableTextareaField, TextareaField } from '@/components/ui/textarea-field';
import { SubmitFormButton } from '@/components/ui/submit-form-button';
import { InputField } from './input-field';
import { RadioGroupField, RadioGroupFieldItem } from './radio-group-field';
import { DatePickerField } from './date-picker-field';
import { ComboboxFieldSimple } from './combobox-field-simple';
import { ComboboxFieldGrouped } from './combobox-field-grouped';
import { CreatableComboboxFieldSimple } from './creatable-combobox-field-simple';
import { CreatableComboboxFieldGrouped } from './creatable-combobox-field-grouped';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
        RadioGroupField,
        RadioGroupFieldItem,
        DatePickerField,
        ArchivoAttachmentField,
        ArchivoUploaderField,
        TextareaField,
        NullableTextareaField,
        ComboboxFieldSimple,
        ComboboxFieldGrouped,
        CreatableComboboxFieldSimple,
        CreatableComboboxFieldGrouped
    },
    formComponents: {
        SubmitFormButton
    }
});
