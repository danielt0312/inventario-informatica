import { Form } from "@/components/ui/form";
import { useAppForm } from "@/components/ui/form-context";
import { useFormMutation } from "@/hooks/use-form-mutation";
import type { Articulo } from "@/types/articulos";

function CreateForm({
    articulo
}: {
    articulo: Articulo
}) {
    const mutation = useFormMutation({
        url: `api/articulos/${articulo.uuid}/configurar`,
        onSuccess: (_, __, ___, { client }) =>
            client.invalidateQueries({ queryKey: ['articulos'] })
    });

    const form = useAppForm({

    });

    return (
        <Form form={form}>

        </Form>
    );
}
