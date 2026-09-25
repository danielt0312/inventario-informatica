import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-context';
import { InputField } from './input-field';
import { RadioGroupField, RadioGroupFieldItem } from './radio-group-field';
import { DatePickerField } from './date-picker-field';
import { ArchivoAttachmentField } from '../features/archivos/attachment-field';
import { ArchivoUploaderField } from '../features/archivos/uploader-field';
import { NullableTextareaField, TextareaField } from './textarea-field';
import { ComboboxFieldSimple } from './combobox-field-simple';
import { ComboboxFieldGrouped } from './combobox-field-grouped';
import { CreatableComboboxFieldSimple } from './creatable-combobox-field-simple';
import { CreatableComboboxFieldGrouped } from './creatable-combobox-field-grouped';
import { SubmitFormButton } from './submit-form-button';

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
