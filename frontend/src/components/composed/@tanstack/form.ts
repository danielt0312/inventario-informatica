import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import {
    CreatableComboboxField,
    Field,
    SubmitButton,
    TextField
} from './form-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        Field,
        TextField,
        CreatableComboboxField
    },
    formComponents: {
        SubmitButton
    }
});
