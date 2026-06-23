import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type Schema, validator } from "./form-schema";
import { useFormMutation } from "../form";
import type { DictaminarActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export const useForm = (dictamen: DictaminarActionDictamen) => {
    const productosToSchema = dictamen.productos.map(v => {
        return {
            id: String(v.id),
            caracteristicas: v.caracteristicas ?? ''
        }
    });

    const defaultValues: Schema = {
        productos: productosToSchema
    }

    const formMutation = useFormMutation(dictamen);

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            formMutation.mutate({ data, formApi });
        }
    });
}

interface FormProps {
    dictamen: DictaminarActionDictamen;
}

export function Form({
    dictamen
}: FormProps) {
    const form = useForm(dictamen);

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

                <form.SubmitButton />
            </form.AppForm>
        </form>
    );
}
