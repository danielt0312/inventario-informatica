import { useAppForm } from "@/components/composed/@tanstack/form";
import {
    ProductoFieldGroup as ProductoFieldGroup,
    type Fields as ProductoFields
} from "@/views/productos/form";
import { createFieldMap } from "@tanstack/react-form";

type Fields = Omit<ProductoFields, 'id'> & {
    numero_serie: string;
    producto_id: string;
};

const defaultValues: Fields = {
    categoria_id: '',
    tipo_id: '',
    marca_id: '',
    producto_id: '',
    numero_serie: ''
}

const fields = createFieldMap(defaultValues);

export const Form = () => {
    const form = useAppForm({
        defaultValues,
    })

    return (
        <>
            <form.AppForm>
                <ProductoFieldGroup
                    form={form}
                    fields={{...fields, id: 'producto_id'}}
                />
            </form.AppForm>
        </>
    );
}
