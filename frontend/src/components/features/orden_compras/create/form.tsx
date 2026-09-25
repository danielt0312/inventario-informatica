import { useAppForm } from '@/components/ui/form.shared';
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import { defaultValues, validator, type OutputSchema } from "./form-schema";
import { FormLayout } from "@/components/ui/form-layout";
import { FieldGroup } from "@/components/ui/field";
import { OrdenCompraFechaSolicitudField, OrdenCompraNumeroOrdenField } from "./form-fields";
import { ProveedorField } from "../../proveedores/form-fields";
import { ArchivoUploaderField } from "@/components/features/archivos/uploader-field";
import type { TResponse } from "@/types/generics";
import type { OrdenCompra } from "@/types/orden_compras";

export const useCreateOrdenCompraFormMutation = (
    props?: Omit<FormMutation<TResponse<OrdenCompra>, OutputSchema>, 'url' | 'method' | 'axiosConfig' | 'toFormData'>
) => (
    useFormMutation<TResponse<OrdenCompra>, OutputSchema>({
        url: `api/orden_compras`,
        ...props,
    })
);

export const useCreateOrdenCompraForm = (
    useMutationHook = useCreateOrdenCompraFormMutation
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

interface AppFormProps extends Omit<React.ComponentProps<typeof FormLayout>, 'form'> {
    form: ReturnType<typeof useCreateOrdenCompraForm>;
}

export const AppCreateOrdenCompraForm = ({
    form,
    children,
    ...props
}: AppFormProps) => (
    <FormLayout form={form} {...props}>
        <form.AppForm>
            <FieldGroup className="flex-row">
                <form.AppField
                    name="numero_orden"
                    children={() => <OrdenCompraNumeroOrdenField />}
                />

                <form.AppField
                    name="fecha_solicitud"
                    children={() => <OrdenCompraFechaSolicitudField />}
                />
            </FieldGroup>

            <form.AppField
                name="proveedor_id"
                children={() => <ProveedorField />}
            />

            <form.AppField
                name="archivo_uuid"
                children={(field) => (
                    <ArchivoUploaderField
                        onValueChange={(value) => field.handleChange(value?.uuid)}
                    />
                )}
            />

            {children}
        </form.AppForm>
    </FormLayout>
);

interface FormProps extends Omit<React.ComponentProps<typeof FormLayout>, 'form'> {
    useFormHook?: typeof useCreateOrdenCompraForm;
}

export function CreateOrdenCompraForm({
    useFormHook = useCreateOrdenCompraForm,
    ...props
}: FormProps) {
    const form = useFormHook();

    return (
        <AppCreateOrdenCompraForm form={form} {...props}>
            <form.SubmitFormButton />
        </AppCreateOrdenCompraForm>
    );
}
