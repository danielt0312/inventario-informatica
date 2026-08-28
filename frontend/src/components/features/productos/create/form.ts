import type { TResponse } from "@/types/generics";
import type { Producto } from "@/types/productos";
import { useAppForm } from "@/components/ui/form-context";
import { type FormMutation, useFormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator, type OutputSchema } from "./form-schema";

const useCreateFormMutation = (
    props?: Omit<FormMutation<TResponse<Producto>, OutputSchema>, 'url'>
) => useFormMutation<TResponse<Producto>, OutputSchema>({
    url: `api/productos`,
    ...props
});

const useCreateForm = (useMutationHook = useCreateFormMutation) => {
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
    })
};

export { useCreateFormMutation as useCreateProductoFormMutation, useCreateForm as useCreateProductoForm }
