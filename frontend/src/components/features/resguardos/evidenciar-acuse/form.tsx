import { Form } from "@/components/ui/form";
import { useAppForm } from "@/components/ui/form-context";
import { evidenciarAcuseResguardoDefaultFormValues, evidenciarAcuseResguardoValidator } from "./form-schema";
import type { Resguardo } from "@/types/resguardos";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { ResguardoAcuseRecibidoField } from "./form-fields";

function EvidenciarAcuseForm({
    resguardo
}: {
    resguardo: Resguardo
}) {
    const { mutate } = useFormMutation({
        url: `api/resguardos/${resguardo.uuid}/evidenciar`,
    })

    const form = useAppForm({
        defaultValues: evidenciarAcuseResguardoDefaultFormValues,
        validators:{
            onSubmit: evidenciarAcuseResguardoValidator
        },
        onSubmit: ({ value, formApi }) => {
            const data = evidenciarAcuseResguardoValidator.parse(value);
            mutate({ data, formApi });
        }
    });

    return (
        <Form form={form}>
            <form.AppForm>
                <form.AppField
                    name="acuse_archivo_uuid"
                    children={() => <ResguardoAcuseRecibidoField />}
                />

                <form.SubmitFormButton />
            </form.AppForm>
        </Form>
    );
}

export {
    EvidenciarAcuseForm as EvidenciarAcuseResguardoForm
}
