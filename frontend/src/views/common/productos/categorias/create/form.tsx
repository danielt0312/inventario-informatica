import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type FormMutation, useFormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator } from "./form-schema";
import { NombreField } from "./form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";

export const useCreateFormMutation = (
    props?: Omit<FormMutation, 'axiosConfig' | 'url'>
) => useFormMutation({
    url: `api/producto_categorias`,
    ...props
});

interface UseFormOptions {
    useMutationHook?: typeof useCreateFormMutation;
}

export const useForm = ({
    useMutationHook = useCreateFormMutation
}: UseFormOptions = {}) => {
    const { mutate } = useMutationHook();

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });
}

interface AppFormProps extends Omit<React.ComponentProps<typeof PrimitiveForm>, 'form'> {
    form: ReturnType<typeof useForm>;
}

export const AppForm = ({
    form,
    children,
    ...props
}: AppFormProps) => (
    <PrimitiveForm
        form={form}
        {...props}
    >
        <form.AppField
            name="nombre"
            children={() => <NombreField />}
        />
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
