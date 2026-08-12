import { useAppForm } from "@/components/ui/form-context";
import { type FormMutation, useFormMutation } from "@/hooks/use-form-mutation";
import { productoCategoriaDefaultValues, productoCategoriaValidator, type ProductoCategoriaCreateOutputSchema } from "./form-schema";
import { ProductoCategoriaNombreField } from "./form-fields";
import { Form as PrimitiveForm } from "@/components/ui/form";
import type { TResponse } from "@/types/generics";
import type { ProductoCategoria } from "@/types/productos";

export const useCreateFormMutation = (
    props?: Omit<FormMutation<TResponse<ProductoCategoria>, ProductoCategoriaCreateOutputSchema>, 'url'>
) => useFormMutation<TResponse<ProductoCategoria>, ProductoCategoriaCreateOutputSchema>({
    url: `api/producto_categorias`,
    ...props
});

export const useForm = (useMutationHook = useCreateFormMutation) => {
    const { mutate } = useMutationHook();

    return useAppForm({
        defaultValues: productoCategoriaDefaultValues,
        validators: {
            onSubmit: productoCategoriaValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = productoCategoriaValidator.parse(value);
            mutate({ data, formApi });
        }
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
            name="nombre"
            children={() => <ProductoCategoriaNombreField />}
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
            <form.SubmitFormButton />
        </AppForm>
    );
}
