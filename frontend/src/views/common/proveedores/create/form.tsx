import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import type { TResponse } from "@/types/generics";
import { defaultValues, validator, type OutputSchema } from "./form-schema";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { NombreField } from "./form-fields";
import type { Proveedor } from "@/types/orden_compras";

export const useCreateProveedorFormMutation = (
    props?: Omit<FormMutation<TResponse<Proveedor>, OutputSchema>, 'url' | 'method' | 'axiosConfig'>
) => (
    useFormMutation<TResponse<Proveedor>, OutputSchema>({
        url: `api/facturas`,
        ...props,
    })
);

export const useCreateProveedorForm = (
    useMutationHook = useCreateProveedorFormMutation
) => {
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

interface AppFormProps extends Omit<React.ComponentProps<typeof Form>, 'form'> {
    form: ReturnType<typeof useCreateProveedorForm>;
}

export const AppCreateProveedorForm = ({
    form,
    children,
    ...props
}: AppFormProps) => (
    <Form form={form} {...props}>
        <form.AppForm>
            <form.AppField
                name="nombre"
                children={() => <NombreField />}
            />

            {children}
        </form.AppForm>
    </Form>
);

interface FormProps extends Omit<React.ComponentProps<typeof Form>, 'form'> {
    useFormHook?: typeof useCreateProveedorForm;
}

export function CreateProveedorForm({
    useFormHook = useCreateProveedorForm,
    ...props
}: FormProps) {
    const form = useFormHook();

    return (
        <AppCreateProveedorForm form={form} {...props}>
            <SubmitButton className="justify-self-center" />
        </AppCreateProveedorForm>
    );
}
