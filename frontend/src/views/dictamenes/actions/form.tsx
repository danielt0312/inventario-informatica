import { DictamenEstadoEnum } from "@/lib/constants";

import {
    StateAction,
    type ActionDictamenEstadoEnum,
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

export const Form = ({
    dictamen
}: {
    dictamen: ValidatedDictamen
}) => ({
    [DictamenEstadoEnum.DICTAMINAR]: <DictaminarForm dictamen={dictamen} />,
    [DictamenEstadoEnum.EVIDENCIAR]: <EvidenciarForm dictamen={dictamen as EvidenciarValidatedDictamen} />,
    [DictamenEstadoEnum.SURTIR]: <FacturarForm dictamen={dictamen as FacturarValidatedDictamen} />,
    [DictamenEstadoEnum.INVENTARIAR]: 'inventariar',
} as const satisfies Record<ActionDictamenEstadoEnum, React.ReactNode>)[dictamen.estado.id];

export function useFormMutation(dictamen: ValidatedDictamen) {
    const navigate = useNavigate();
    const action = StateAction[dictamen.estado.id];

    return usePostFormMutation({
        url: `api/dictamenes/${dictamen.uuid}/${action}`,
        onSuccess: (_, __, ___, { client }) => {
            client.invalidateQueries({ queryKey: ['dictamenes'] });
            client.invalidateQueries({ queryKey: ['dictamen', dictamen.uuid] });
            navigate({ to: IndexRoute.to });
        }
    })
}
