import { useAppForm } from "@/components/composed/@tanstack/form";
import api from "@/lib/axios";
import { FieldGroupProductoFields } from "@/views/productos/form";
import {
    type Schema,
    defaultValues as productoDefaultValues,
    validator as productoValidator
} from "@/views/productos/form-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import z from "zod";
import { Route as RouteIndex } from "@/routes/_auth/inventario"
import { isAxiosError } from "axios";
import { setFormValidationErrors } from "@/lib/utils";
import { CheckboxField, TextField } from "@/components/composed/@tanstack/form-fields";
import { FieldGroup } from "@/components/ui/field";

type ArticuloFields = Omit<Schema, 'id'> & {
    producto_id: Schema['id'];
    costo_unitario: number | null;
    numero_serie: string | null;
    contable: boolean;
};

const { id: producto_id, ...restProductoDefaultValues } = productoDefaultValues;

const defaultValues: ArticuloFields = {
    ...restProductoDefaultValues,
    producto_id,
    costo_unitario: null,
    numero_serie: null,
    contable: false
}

export const validator = productoValidator
    .omit({ id: true })
    .extend({
        producto_id: productoValidator.shape.id,
        costo_unitario: z
            .number('Debes de ingresar un valor numérico')
            .positive('El valor debe ser positivo')
            .nullable(),
        contable: z
            .boolean(),
        numero_serie: z
            .string()
            .nullable()
    });

export const useForm = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator
        },
        onSubmit: async ({ value, formApi }) => {
            try {
                await api.post('api/articulos', value);

                queryClient.invalidateQueries({ queryKey: ['articulos'] });
                navigate({ to: RouteIndex.to });
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 422) {
                    const serverErrors = error.response.data.errors;
                    setFormValidationErrors(formApi, serverErrors);
                }
            }
        }
    });

    return form;
};

export const Form = () => {
    const form = useForm();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="contents"
        >
            <form.AppForm>
                <FieldGroupProductoFields
                    form={form}
                    fields={{
                        categoria_id: 'categoria_id',
                        tipo_id: 'tipo_id',
                        marca_id: 'marca_id',
                        id: 'producto_id'
                    }}
                />

                <form.AppField
                    name="numero_serie"
                    children={(field) => (
                        <TextField
                            label="Número de serie"
                            value={field.state.value ?? ''}
                        />
                    )}
                />

                <FieldGroup className="grid grid-cols-2">
                    <form.AppField
                        name="costo_unitario"
                        children={(field) => (
                            <TextField
                                label="Costo unitario"
                                value={field.state.value ?? ''}
                            />
                        )}
                    />

                    <form.AppField
                        name="contable"
                        children={() => <CheckboxField label="Es contable" />}
                    />
                </FieldGroup>

                <form.SubmitButton />
            </form.AppForm>
        </form>
    );
}
