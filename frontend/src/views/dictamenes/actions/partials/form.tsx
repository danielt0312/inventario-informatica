import { DictamenEstadoEnum } from "@/lib/constants";
import { type ActionDictamenWithDictamenProductosUnion } from "@/routes/_auth/dictamenes/$uuid/-types";
import { ActionStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { Form as EvidenciarForm } from "../evidenciar/form";
import { Form as DictaminarForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarForm } from "../inventariar/form";
import { isDictaminarDictamenWithProductos } from "@/routes/_auth/dictamenes/$uuid/$action";
import { SurtirForm } from "../surtir/form";

export function ActionForm({ dictamen }: { dictamen: ActionDictamenWithDictamenProductosUnion }) {
    if (isDictaminarDictamenWithProductos(dictamen)) {
        return <DictaminarForm dictamen={dictamen} />;
    }

    switch (dictamen.estado.id) {
        case DictamenEstadoEnum.EVIDENCIAR:
            return <EvidenciarForm dictamen={dictamen} />;
        case DictamenEstadoEnum.SURTIR:
            return <SurtirForm dictamen={dictamen} />;
        case DictamenEstadoEnum.INVENTARIAR:
            return <InventariarForm dictamen={dictamen} />;
    }
}

export function useActionFormMutation(dictamen: ActionDictamenWithDictamenProductosUnion) {
    const action = ActionStates[dictamen.estado.id];
    const navigate = useNavigate();

    return useFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/${action}`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['dictamenes'] });
            navigate({ to: IndexRoute.to });
        }
    })
}
