import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator } from "./form-schema";
import { DatePickerField, FileUploaderField } from "@/components/composed/@tanstack/form/field-components";
import { cn, toISODate } from "@/lib/utils";
import type { Factura } from "@/types/documentos";
import type { TResponse } from "@/types/generics";

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
            const data = validator.parse(value);

            const formData = new FormData;
            formData.append('fecha_emision', data.fecha_emision);
            formData.append('archivo', data.archivo[0]);

            mutate({ data: formData, formApi: formApi })
        }
    })
}

interface FormProps
    extends React.ComponentProps<'form'> {
    useFormHook?: typeof useForm;
}

export function Form({
    useFormHook = useForm,
    className,
    ...props
}: FormProps) {
    const form = useFormHook();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className={cn("contents", className)}
            {...props}
        >
            <form.AppForm>
                <form.AppField
                    name="fecha_emision"
                    children={() => (
                        <DatePickerField
                            label="Fecha de emisión"
                            placeholder="Ingresa la fecha de emisión"
                            parseValue={toISODate}
                        />
                    )}
                />

                <form.AppField
                    name="archivo"
                    children={() => (
                        <FileUploaderField
                            label="Archivo"
                            accept="application/pdf"
                        />
                    )}
                />

                <form.SubmitButton className="justify-self-center" />
            </form.AppForm>
        </form>
    );
}
