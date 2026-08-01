import { useAppForm } from "@/components/composed/@tanstack/form/form";
import { FieldGroup } from "@/components/ui/field";
import { Route } from "@/routes/_auth/dictamenes/$uuid/editar";
import { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";

export const DictamenEditarForm = () => {
    const { dictamen } = Route.useRouteContext();

    const form = useAppForm({

    });

    return (
        <>
            <FieldGroup>
            </FieldGroup>
        </>
    );
}
