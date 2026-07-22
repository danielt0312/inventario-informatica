import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import type { TResponse } from "@/types/generics";
import { defaultValues, validator, type OutputSchema } from "./form-schema";
import { Form, SubmitButton } from "@/components/composed/@tanstack/form/form-components";
import type { OrdenCompra } from "@/types/orden_compras";
import { PdfFileField } from "../../archivos/form-fields";
import { FieldGroup } from "@/components/ui/field";
import { FechaSolicitudField, NumeroOrdenField } from "./form-fields";
import { ProveedorField } from "../../proveedores/form-fields";

export const useCreateOrdenCompraFormMutation = (
    props?: Omit<FormMutation<TResponse<OrdenCompra>, OutputSchema>, 'url' | 'method' | 'axiosConfig' | 'toFormData'>
) => (
    useFormMutation<TResponse<OrdenCompra>, OutputSchema>({
        url: `api/facturas`,
        toFormData: (data) => {
            const formData = new FormData;

            formData.append('numero_orden', data.numero_orden);
            formData.append('fecha_solicitud', data.fecha_solicitud);
            formData.append('proveedor_id', String(data.proveedor_id));
            formData.append('archivo', data.archivo);

            return formData;
        },
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

interface AppFormProps extends Omit<React.ComponentProps<typeof Form>, 'form'> {
    form: ReturnType<typeof useCreateOrdenCompraForm>;
}

export const AppCreateOrdenCompraForm = ({
    form,
    children,
    ...props
}: AppFormProps) => (
    <Form form={form} {...props}>
        <form.AppForm>
            <FieldGroup className="flex-row">
                <form.AppField
                    name="numero_orden"
                    children={() => <NumeroOrdenField />}
                />

                <form.AppField
                    name="fecha_solicitud"
                    children={() => <FechaSolicitudField />}
                />
            </FieldGroup>

            <form.AppField
                name="proveedor_id"
                children={() => <ProveedorField />}
            />

            <form.AppField
                name="archivo"
                children={() => <PdfFileField />}
            />

            {children}
        </form.AppForm>
    </Form>
);

interface FormProps extends Omit<React.ComponentProps<typeof Form>, 'form'> {
    useFormHook?: typeof useCreateOrdenCompraForm;
}

export function CreateOrdenCompraForm({
    useFormHook = useCreateOrdenCompraForm,
    ...props
}: FormProps) {
    const form = useFormHook();

    return (
        <AppCreateOrdenCompraForm form={form} {...props}>
            <SubmitButton className="justify-self-center" />
        </AppCreateOrdenCompraForm>
    );
}
