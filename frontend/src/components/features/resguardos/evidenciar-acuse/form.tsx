import { Form } from "@/components/ui/form";
import { useAppForm } from "@/components/ui/form-context";
import { evidenciarAcuseResguardoDefaultFormValues, evidenciarAcuseResguardoValidator } from "./form-schema";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { ResguardoAcuseRecibidoField } from "./form-fields";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Resguardo } from "@/types/resguardos";

function EvidenciarAcuseForm({
    resguardo
}: {
    resguardo: Resguardo
}) {
    const { mutate, isPending } = useFormMutation({
        url: `api/resguardos/${resguardo.uuid}/evidenciar-acuse`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['resguardos'] });
        }
    });

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
        <Form form={form} className="flex flex-col gap-7">
            <form.AppForm>
                <form.AppField
                    name="acuse_archivo_uuid"
                    children={() => <ResguardoAcuseRecibidoField className="w-1/2" />}
                />

                <SubmitButton isSubmitting={isPending} disabled={isPending} className="self-start" />
            </form.AppForm>
        </Form>
    );
}

export {
    EvidenciarAcuseForm as EvidenciarAcuseResguardoForm
}
