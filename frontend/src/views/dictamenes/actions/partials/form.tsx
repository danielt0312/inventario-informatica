import { type DetailedActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import { ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { Form as EvidenciarForm } from "../evidenciar/form";
import { Form as DictaminarForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarForm } from "../inventariar/form";
import { isDetailedActionDictaminarDictamen, isDetailedInventariarDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";

export function ActionForm({ dictamen }: { dictamen: DetailedActionDictamen }) {
    if (isDetailedActionDictaminarDictamen(dictamen)) {
        return <DictaminarForm dictamen={dictamen} />;
    }

    if (isDetailedInventariarDictamen(dictamen)) {
        return <InventariarForm dictamen={dictamen} />;
    }

    return <EvidenciarForm dictamen={dictamen} />;
}

export function useActionFormMutation(dictamen: DetailedActionDictamen) {
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
