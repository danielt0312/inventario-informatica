import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type FormMutation, useFormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator, type OutputSchema } from "./form-schema";
import { NombreField } from "./form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { TResponse } from "@/types/generics";
import type { Producto } from "@/types/productos";
import { formOptions } from "@tanstack/react-form";
import { asAnyFormApi } from "@/lib/utils";
import { ProductoTipoField } from "../tipos/form-fields";
import { ProductoMarcaField } from "../marcas/form-fields";

export const useCreateFormMutation = (
    props?: Omit<FormMutation<TResponse<Producto>, OutputSchema>, 'url'>
) => useFormMutation<TResponse<Producto>, OutputSchema>({
    url: `api/productos`,
    ...props
});

export const defaultFormOptions = (useMutationHook = useCreateFormMutation) => {
    const mutation = useMutationHook();

    return formOptions({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutation.mutate({ data, formApi: asAnyFormApi(formApi) });
        }
    });
}

export const useForm = (options = defaultFormOptions) => (
    useAppForm(options())
);

interface AppFormProps extends Omit<React.ComponentProps<typeof PrimitiveForm>, 'form'> {
    form: ReturnType<typeof useForm>;
    showTipoField?: boolean;
}

export const AppForm = ({
    form,
    children,
    showTipoField,
    ...props
}: AppFormProps) => (
    <PrimitiveForm
        form={asAnyFormApi(form)}
        {...props}
    >
        {showTipoField && <form.AppField name="tipo_id" children={() => <ProductoTipoField />}/>}
        <form.AppField name="marca_id" children={() => <ProductoMarcaField />}/>
        <form.AppField name="nombre" children={() => <NombreField />}/>
        {children}
    </PrimitiveForm>
);


interface FormProps extends Omit<AppFormProps, 'form' | 'children'> {
    useFormHook?: typeof useForm;
    children?: (form: ReturnType<typeof useForm>) => React.ReactNode;
}

export const Form = ({
    useFormHook = useForm,
    children,
    ...props
}: FormProps) => {
    const form = useFormHook();

    return (
        <AppForm form={form} {...props}>
            {children?.(form)}
            <SubmitButton />
        </AppForm>
    );
}
