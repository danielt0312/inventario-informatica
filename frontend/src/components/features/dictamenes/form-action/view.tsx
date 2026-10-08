import type { DetailedFormActionDictamen } from "./types";
import { EvidenciarAcuseDictamenForm } from "../evidenciar-acuse/form";
import { DictaminarDictamenForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarDictamenForm } from "../inventariar/form";
import { esDetailedPorDictaminarDictamen, esDetailedPorInventariarDictamen } from "@/components/features/dictamenes/guards";
import { ActionDictamenStates } from "./constants";

function FormAction({ dictamen }: { dictamen: DetailedFormActionDictamen }) {
    if (esDetailedPorDictaminarDictamen(dictamen)) {
        return <DictaminarDictamenForm dictamen={dictamen} />;
    }

    if (esDetailedPorInventariarDictamen(dictamen)) {
        return <InventariarDictamenForm dictamen={dictamen} />;
    }

    return <EvidenciarAcuseDictamenForm dictamen={dictamen} />;
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
