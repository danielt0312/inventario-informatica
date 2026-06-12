import { useAppForm } from "@/components/composed/@tanstack/form";
import { usePostFormMutation } from "@/hooks/use-post-form-mutation";
import { defaultValues, validator } from "./form-schema";
import { DatePickerField, FileUploaderField } from "@/components/composed/@tanstack/form-field";
import { toISODate } from "@/lib/utils";

export const useFormMutation = () => usePostFormMutation({
    axiosConfig: {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    url: `api/facturas`,
    onSuccess: (_, __, ___, { client }) => client.invalidateQueries({ queryKey: ['facturas'] })
});

export const useForm = () => {
    const formMutation = useFormMutation();

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

            formMutation.mutate({ data: formData, api: formApi })
        }
    })
}

export function Form() {
    const form = useForm();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="contents"
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
