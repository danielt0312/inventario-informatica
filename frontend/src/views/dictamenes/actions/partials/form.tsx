import { type ActionDictamenWithDictamenProductosUnion } from "@/routes/_auth/dictamenes/$uuid/-types";
import { ActionDictamenEstadoEnum, ActionDictamenStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { Form as EvidenciarForm } from "../evidenciar/form";
import { Form as DictaminarForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarForm } from "../inventariar/form";
import { isActionDictaminarDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/$action";

export function ActionForm({ dictamen }: { dictamen: ActionDictamenWithDictamenProductosUnion }) {
    if (isActionDictaminarDictamenWithDictamenProductos(dictamen)) {
        return <DictaminarForm dictamen={dictamen} />;
    }

    switch (dictamen.estado.id) {
        case ActionDictamenEstadoEnum.EVIDENCIAR:
            return <EvidenciarForm dictamen={dictamen} />;
        case ActionDictamenEstadoEnum.INVENTARIAR:
            return <InventariarForm dictamen={dictamen} />;
        case ActionDictamenEstadoEnum.RESGUARDAR:
            return '<ResguardarForm />';
    }
}

export function useActionFormMutation(dictamen: ActionDictamenWithDictamenProductosUnion) {
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
