import type { DetailedFormActionDictamen } from "./types";
import { Form as EvidenciarForm } from "../evidenciar-acuse/form";
import { DictaminarDictamenForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarDictamenForm } from "../inventariar/form";
import { isDetailedDictaminarDictamen, isDetailedInventariarDictamen } from "@/components/features/dictamenes/helpers";
import { ActionDictamenStates } from "./constants";

function FormAction({ dictamen }: { dictamen: DetailedFormActionDictamen }) {
    if (isDetailedDictaminarDictamen(dictamen)) {
        return <DictaminarDictamenForm dictamen={dictamen} />;
    }

    if (isDetailedInventariarDictamen(dictamen)) {
        return <InventariarDictamenForm dictamen={dictamen} />;
    }

    return <EvidenciarForm dictamen={dictamen} />;
}

function useFormActionMutation(dictamen: DetailedFormActionDictamen) {
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

export {
    FormAction as DictamenFormAction,
    useFormActionMutation as useDictamenFormActionMutation
}
