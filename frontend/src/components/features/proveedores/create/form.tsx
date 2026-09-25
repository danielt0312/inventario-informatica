import { useAppForm } from '@/components/ui/form.shared';
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import { createProveedorDefaultValues, createProveedorValidator, type CreateProveedorOutputSchema } from "./form-schema";
import { FormLayout } from "@/components/ui/form-layout";
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

interface AppFormProps extends Omit<React.ComponentProps<typeof FormLayout>, 'form'> {
    form: ReturnType<typeof useCreateProveedorForm>;
}

export const AppCreateProveedorForm = ({
    form,
    children,
    ...props
}: AppFormProps) => (
    <FormLayout form={form} {...props}>
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
    </FormLayout>
);

interface FormProps extends Omit<React.ComponentProps<typeof FormLayout>, 'form'> {
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
