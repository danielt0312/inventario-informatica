import { useAppForm } from "@/components/composed/@tanstack/form";
import { usePostFormMutation, type FormMutation } from "@/hooks/use-post-form-mutation";
import { defaultValues, validator } from "./form-schema";
import { DatePickerField, FileUploaderField } from "@/components/composed/@tanstack/form-field";
import { cn, toISODate } from "@/lib/utils";

export const useFormMutation = (
    props?: Omit<FormMutation, 'axiosConfig' | 'url'>
) => usePostFormMutation({
    axiosConfig: {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    url: `api/facturas`,
    ...props,
    onSuccess: (data, variables, onMutateResult, context) => {
        context.client.invalidateQueries({ queryKey: ['facturas'] });
        props?.onSuccess?.(data, variables, onMutateResult, context);
    }
});

interface UseFormOptions {
    useMutationHook?: typeof useFormMutation;
}

export const useForm = ({
    useMutationHook = useFormMutation
}: UseFormOptions = {}) => {
    const formMutation = useMutationHook();

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

            formMutation.mutate({ data: formData, formApi: formApi })
        }
    })
}

interface FormProps
    extends React.ComponentProps<'form'>
{
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
                        />
                    )}
                />

                <form.SubmitButton className="justify-self-center" />
            </form.AppForm>
        </form>
    );
}
