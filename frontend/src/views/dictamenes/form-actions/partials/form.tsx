import { ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { Form as EvidenciarForm } from "../evidenciar/form";
import { Form as DictaminarForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarForm } from "../inventariar/form";
import { isDetailedDictaminarDictamen, isDetailedInventariarDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import type { DetailedFormActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export function ActionForm({ dictamen }: { dictamen: DetailedFormActionDictamen }) {
    if (isDetailedDictaminarDictamen(dictamen)) {
        return <DictaminarForm dictamen={dictamen} />;
    }

    if (isDetailedInventariarDictamen(dictamen)) {
        return <InventariarForm dictamen={dictamen} />;
    }

    return <EvidenciarForm dictamen={dictamen} />;
}

export function useActionFormMutation(dictamen: DetailedFormActionDictamen) {
    const action = ActionDictamenStates[dictamen.estado.id];
    const navigate = useNavigate();

    return useFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/${action}`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['dictamenes'] });
            navigate({ to: IndexRoute.to });
        }
    })
}
