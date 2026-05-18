import { useAppForm } from "@/components/composed/@tanstack/form";
import api from "@/lib/axios";
import {
    FieldGroupProductoFields,
    type ProductoFields,
    validator as productoValidator
} from "@/views/productos/form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import z from "zod";
import { Route as RouteIndex } from "@/routes/_auth/inventario"
import { isAxiosError } from "axios";
import { handleLaravel422 } from "@/lib/utils";

type ArticuloFields = Omit<ProductoFields, 'id'> & {
    producto_id: ProductoFields['id'];
};

const defaultValues: ArticuloFields = {
    categoria_id: null,
    tipo_id: null,
    marca_id: null,
    producto_id: null,
}

export const validator = z.object({
    categoria_id: productoValidator.shape.categoria_id,
    tipo_id: productoValidator.shape.tipo_id,
    marca_id: productoValidator.shape.marca_id,
    producto_id: productoValidator.shape.id,
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
                    handleLaravel422(formApi, serverErrors);
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
                <form.SubmitButton />
            </form.AppForm>
        </form>
    );
}
