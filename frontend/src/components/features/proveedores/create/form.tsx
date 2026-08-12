import { useAppForm } from "@/components/ui/form-context";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import { createProveedorDefaultValues, createProveedorValidator, type CreateProveedorOutputSchema } from "./form-schema";
import { Form } from "@/components/ui/form";
import { ProveedorNombreField, ProveedorRfcField } from "./form-fields";
import type { TResponse } from "@/types/generics";
import type { Proveedor } from "@/types/orden_compras";

export const useCreateProveedorFormMutation = (
    props?: Omit<FormMutation<TResponse<Proveedor>, CreateProveedorOutputSchema>, 'url' | 'method' | 'axiosConfig'>
) => (
    useFormMutation<TResponse<Proveedor>, CreateProveedorOutputSchema>({
        url: `api/proveedores`,
        ...props,
    })
);

export const useCreateProveedorForm = (
    useMutationHook = useCreateProveedorFormMutation
) => {
    const { mutate } = useMutationHook();

    return useAppForm({
        defaultValues: createProveedorDefaultValues,
        validators: {
            onSubmit: createProveedorValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = createProveedorValidator.parse(value);
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
                children={() => <ProveedorNombreField />}
            />

            <form.AppField
                name="rfc"
                children={() => <ProveedorRfcField />}
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
            <form.SubmitFormButton />
        </AppCreateProveedorForm>
    );
}
