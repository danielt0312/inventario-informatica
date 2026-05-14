import { createFormHookContexts } from '@tanstack/react-form'
import { createFormHook } from '@tanstack/react-form'

import {
    FormCreatableComboboxField,
    FormField,
    FormTextField
} from './form-field';

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        FormField,
        FormTextField,
        FormCreatableComboboxField
    },
    formComponents: {}
});
