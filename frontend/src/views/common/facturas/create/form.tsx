import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator, type FacturaCreateSchemaOutput } from "./form-schema";
import type { Factura } from "@/types/documentos";
import type { TResponse } from "@/types/generics";
import { Form as RootForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { FechaEmisionField } from "./form-fields";
import { ArchivoUploaderField } from "@/components/features/archivos/uploader-field";

export const useFacturaCreateFormMutation = (
    props?: Omit<FormMutation<TResponse<Factura>, FacturaCreateSchemaOutput>, 'url' | 'method' | 'axiosConfig'>
) => (
    useFormMutation<TResponse<Factura>, FacturaCreateSchemaOutput>({
        url: `api/facturas`,
        ...props,
    })
);

export const useForm = (
    useMutationHook = useFacturaCreateFormMutation
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

interface FormProps extends Omit<React.ComponentProps<typeof RootForm>, 'form'> {
    useFormHook?: typeof useForm;
}

export function Form({
    useFormHook = useForm,
    ...props
}: FormProps) {
    const form = useFormHook();

    return (
        <RootForm form={form} {...props}>
            <form.AppForm>
                <form.AppField
                    name="fecha_emision"
                    children={() => <FechaEmisionField />}
                />

                <form.AppField
                    name="archivo_uuid"
                    children={(field) => (
                        <ArchivoUploaderField
                            onValueChange={(value) => field.handleChange(value?.uuid)}
                        />
                    )}
                />

                <SubmitButton className="justify-self-center" />
            </form.AppForm>
        </RootForm>
    );
}
