import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { defaultValues, validator, type FacturaCreateSchemaOutput } from "./form-schema";
import type { Factura } from "@/types/documentos";
import type { TResponse } from "@/types/generics";
import { Form as RootForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { FechaEmisionField } from "./form-fields";
import { ArchivoUploaderField } from "@/components/features/archivos/uploader-field";
import * as m from "@/hooks/use-form-mutation";
import * as f from "@tanstack/react-form";

const useFormMutation = (
    props?: Omit<m.FormMutation<TResponse<Factura>, FacturaCreateSchemaOutput>, 'url' | 'method' | 'axiosConfig'>
) => m.useFormMutation<TResponse<Factura>, FacturaCreateSchemaOutput>({
        url: `api/facturas`,
        ...props,
    });

const formOptions = () => f.formOptions({
    defaultValues,
    validators: {
        onSubmit: validator
    }
});

const useForm = (
    useMutationHook = useFormMutation,
    options = formOptions,
) => {
    const { mutate } = useMutationHook();

    return useAppForm({
        ...options(),
        onSubmit: ({ value, formApi }) => {
            const data = validator.parse(value);
            mutate({ data, formApi });
        }
    });
}

interface FormProps extends Omit<React.ComponentProps<typeof RootForm>, 'form'> {
    useFormHook?: typeof useForm;
}

function Form({
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

export {
    useFormMutation as useFacturaCreateFormMutation,
    formOptions as facturaCreateFormOptions,
    useForm as useFacturaCreateForm,
    Form as FacturaCreateForm
}
