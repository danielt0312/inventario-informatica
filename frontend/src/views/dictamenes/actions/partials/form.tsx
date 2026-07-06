import { DictamenEstadoEnum } from "@/lib/constants";

import {
    type ActionDictamenWithDictamenProductos,
    type DictaminadoDictamenWithDictaminadoDictamenProductos
} from "@/routes/_auth/dictamenes/$uuid/-types";
import { ActionStates } from "@/routes/_auth/dictamenes/$uuid/-constants";
import { Form as EvidenciarForm } from "../evidenciar/form";
import { Form as DictaminarForm } from "../dictaminar/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { SurtirForm } from "../surtir/form";
import { useNavigate } from "@tanstack/react-router";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import { InventariarForm } from "../inventariar/form";

export function ActionForm({ dictamen }: { dictamen: ActionDictamenWithDictamenProductos }) {
    switch (dictamen.estado.id) {
        case DictamenEstadoEnum.DICTAMINAR:
            return <DictaminarForm dictamen={dictamen} />;
        case DictamenEstadoEnum.EVIDENCIAR:
            return <EvidenciarForm dictamen={dictamen as DictaminadoDictamenWithDictaminadoDictamenProductos} />;
        case DictamenEstadoEnum.SURTIR:
            return <SurtirForm dictamen={dictamen as DictaminadoDictamenWithDictaminadoDictamenProductos} />;
        case DictamenEstadoEnum.INVENTARIAR:
            return <InventariarForm />;
        default:
            // todo mostrar un mensaje de error
            return null;
    }
}

export function useActionFormMutation(dictamen: ActionDictamenWithDictamenProductos) {
    const action = ActionStates[dictamen.estado.id];
    const navigate = useNavigate();

    return useFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/${action}`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['dictamenes'] });
            client.invalidateQueries({ queryKey: ['dictamenes', dictamen.uuid] });
            navigate({ to: IndexRoute.to });
        }
    })
}
