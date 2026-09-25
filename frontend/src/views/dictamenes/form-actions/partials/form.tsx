import { ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { Form as EvidenciarForm } from "../evidenciar-acuse/form";
import { DictaminarDictamenForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarDictamenForm } from "../../../../components/features/dictamenes/inventariar/form";
import { isDetailedDictaminarDictamen, isDetailedInventariarDictamen } from "@/routes/_auth/dictamenes/$uuid/-utils";
import type { DetailedCorregibleActionDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export function ActionForm({ dictamen }: { dictamen: DetailedCorregibleActionDictamen }) {
    if (isDetailedDictaminarDictamen(dictamen)) {
        return <DictaminarDictamenForm dictamen={dictamen} />;
    }

    if (isDetailedInventariarDictamen(dictamen)) {
        return <InventariarDictamenForm dictamen={dictamen} />;
    }

    return <EvidenciarForm dictamen={dictamen} />;
}

export function useActionFormMutation(dictamen: DetailedCorregibleActionDictamen) {
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
