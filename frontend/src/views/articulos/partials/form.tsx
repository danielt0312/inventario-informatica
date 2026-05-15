import { useAppForm } from "@/components/composed/@tanstack/form";
import {
    defaultValues,
    FieldGroupProductoFields,
    type ProductoFields,
    // ProductoFieldGroup as ProductoFieldGroup,
    // type Fields as ProductoFields
} from "@/views/productos/form";
import { createFieldMap, useStore } from "@tanstack/react-form";

type ArticuloFields = ProductoFields;

const fields = createFieldMap(defaultValues);

export const Form = () => {
    const form = useAppForm({
        defaultValues
    })

    return (
        <>
            <form.AppForm>
                <FieldGroupProductoFields
                    form={form}
                    fields={fields}
                />
                <form.SubmitButton />
            </form.AppForm>
        </>
    );
}
