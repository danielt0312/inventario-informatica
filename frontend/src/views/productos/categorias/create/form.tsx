import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type FormMutation, usePostFormMutation } from "@/hooks/use-post-form-mutation";
import { defaultValues, validator } from "./form-schema";
import { createFieldMap } from "@tanstack/react-form";

export const useFormMutation = (
    props?: Omit<FormMutation, 'axiosConfig' | 'url'>
) => usePostFormMutation({
    url: `api/producto_categorias`,
    ...props
});

export type UseFormOptions = {
    useMutationHook?: typeof useFormMutation;
}
export const useForm = ({
    useMutationHook = useFormMutation
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

export type AppFormProps = React.ComponentProps<'form'> & {
    form: ReturnType<typeof useForm>;
}

export function AppForm({
    form,
    children,
    ...props
}: AppFormProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            {...props}
        >
            <form.AppForm>

                {children}
            </form.AppForm>
        </form>
    );
}

export type FormProps = Omit<AppFormProps, 'form'> & {
    useFormHook?: typeof useForm;
    children?: (form: ReturnType<typeof useForm>) => React.ReactNode;
}

export function Form({
    useFormHook = useForm,
    ...props
}: FormProps) {
    const form = useFormHook();

    return <AppForm form={form} {...props} />;
}
