import { DictamenEstadoEnum } from "@/lib/constants";

import {
    StateAction,
    type ValidatedDictamen
} from "@/routes/_auth/dictamenes/$uuid/$action";

import { Form as DictaminarForm } from "./dictaminar/form";
import { Form as EvidenciarForm } from "./evidenciar/form";
import { Form as FacturarForm } from "./facturar/form";
import { type ValidatedDictamen as EvidenciarValidatedDictamen } from "./evidenciar/form-schema";
import { type ValidatedDictamen as FacturarValidatedDictamen } from "./facturar/form-schema";

import { useNavigate } from "@tanstack/react-router";
import { usePostFormMutation } from "@/hooks/use-post-form-mutation";
import { Route as IndexRoute } from "@/routes/_auth/dictamenes";

export function Form({ dictamen }: { dictamen: ValidatedDictamen }) {
    switch (dictamen.estado.id) {
        case DictamenEstadoEnum.DICTAMINAR:
            return <DictaminarForm dictamen={dictamen} />;
        case DictamenEstadoEnum.EVIDENCIAR:
            return <EvidenciarForm dictamen={dictamen as EvidenciarValidatedDictamen} />;
        case DictamenEstadoEnum.SURTIR:
            return <FacturarForm dictamen={dictamen as FacturarValidatedDictamen} />;
        case DictamenEstadoEnum.INVENTARIAR:
            return <>inventariar</>;
        default:
            return null;
    }
}

export function useFormMutation(dictamen: ValidatedDictamen) {
    const navigate = useNavigate();
    const action = StateAction[dictamen.estado.id];

    return usePostFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/${action}`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['dictamenes'] });
            client.invalidateQueries({ queryKey: ['dictamenes', dictamen.uuid] });
            navigate({ to: IndexRoute.to });
        }
    })
}
