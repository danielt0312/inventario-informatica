import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator } from "./form-schema";
import type { Factura } from "@/types/documentos";
import type { TResponse } from "@/types/generics";
import { Form as RootForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import { PdfFileField } from "../../archivos/form-fields";
import { FechaEmisionField } from "./form-fields";

export const useFacturaCreateFormMutation = <R extends TResponse<Factura>, P extends FormData>(props?: Omit<FormMutation, 'url' | 'method' | 'axiosConfig'>) =>
    useFormMutation<R, P>({
        axiosConfig: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
        url: `api/facturas`,
        ...props,
    });

interface UseFormOptions {
    useMutationHook?: typeof useFacturaCreateFormMutation;
}

export const useForm = ({
    useMutationHook = useFacturaCreateFormMutation
}: UseFormOptions = {}) => {
    const { mutate } = useMutationHook();

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            const { fecha_emision, archivo } = validator.parse(value);

            const data = new FormData;
            data.append('fecha_emision', fecha_emision);
            data.append('archivo', archivo);

            mutate({ data, formApi });
        }
    })
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
                    name="archivo"
                    children={() => <PdfFileField />}
                />

                <SubmitButton className="justify-self-center" />
            </form.AppForm>
        </RootForm>
    );
}
