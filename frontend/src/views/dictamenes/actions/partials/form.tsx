import { DictamenEstadoEnum } from "@/lib/constants";

import {
    ActionStates,
    type ActionDictamen,
    type ActionDictamenWithDictamenProductos
} from "@/routes/_auth/dictamenes/$uuid/-types";

import { Form as DictaminarForm } from "../dictaminar/form";
import { Form as EvidenciarForm } from "../evidenciar/form";
import { Form as FacturarForm } from "../facturar/form";

import { useNavigate } from "@tanstack/react-router";
import { usePostFormMutation } from "@/hooks/use-post-form-mutation";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";
import type { DictamenWithDictamenProductos } from "@/types/dictamenes";

export function Form({ dictamen }: { dictamen: ActionDictamen<DictamenWithDictamenProductos> }) {
    switch (dictamen.estado.id) {
        case DictamenEstadoEnum.DICTAMINAR:
            return <DictaminarForm dictamen={dictamen} />;
        case DictamenEstadoEnum.EVIDENCIAR:
            return <EvidenciarForm dictamen={dictamen as ActionDictamenWithDictamenProductos} />;
        case DictamenEstadoEnum.SURTIR:
            return <FacturarForm dictamen={dictamen as ActionDictamenWithDictamenProductos} />;
        case DictamenEstadoEnum.INVENTARIAR:
            return <>inventariar</>;
        default:
            // todo mostrar un mensaje de error
            return null;
    }
}

export function useFormMutation(dictamen: ActionDictamen<DictamenWithDictamenProductos>) {
    const navigate = useNavigate();
    const action = ActionStates[dictamen.estado.id];

    return usePostFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/${action}`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['dictamenes'] });
            client.invalidateQueries({ queryKey: ['dictamenes', dictamen.uuid] });
            navigate({ to: IndexRoute.to });
        }
    })
}
