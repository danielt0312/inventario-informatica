import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { type FormMutation, useFormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator, type OutputSchema } from "./form-schema";
import { NombreField } from "./form-fields";
import { ProductoCategoriaField } from "../../categorias/form-fields";
import { Form as PrimitiveForm, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { TResponse } from "@/types/generics";
import type { ProductoTipo } from "@/types/productos";

export const useCreateFormMutation = (props?: Omit<FormMutation<TResponse<ProductoTipo>, OutputSchema>, 'url' | 'method'>) =>
    useFormMutation<TResponse<ProductoTipo>, OutputSchema>({
        url: `api/producto_tipos`,
        ...props
    });

export const useForm = (useMutationHook = useCreateFormMutation) => {
    const { mutate } = useMutationHook();

    return useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: ({ value, formApi }) => {
            mutate({ data: validator.parse(value), formApi });
        },
    });
}

interface AppFormProps extends Omit<React.ComponentProps<typeof PrimitiveForm>, 'form'> {
    form: ReturnType<typeof useForm>;
}

export const AppForm = ({
    form,
    children,
    ...props
}: AppFormProps) => (
    <PrimitiveForm
        form={form}
        {...props}
    >
        <form.AppField
            name="categoria_id"
            children={() => <ProductoCategoriaField />}
        />

        <form.AppField
            name="nombre"
            children={() => <NombreField />}
        />
        {children}
    </PrimitiveForm>
);


interface FormProps extends Omit<AppFormProps, 'form' | 'children'> {
    useFormHook?: typeof useForm;
    children?: (form: ReturnType<typeof useForm>) => React.ReactNode;
}

export const Form = ({
    useFormHook = useForm,
    children,
    ...props
}: FormProps) => {
    const form = useFormHook();

    return (
        <AppForm form={form} {...props}>
            {children?.(form)}
            <SubmitButton />
        </AppForm>
    );
}
