import { DictamenEstadoEnum } from "@/lib/constants";

import type {
    ActionDictamenEstadoEnum,
    ValidatedDictamen
} from "@/routes/_auth/dictamenes/$uuid/$action";

import { Form as DictaminarForm } from "./dictaminar/form";

import {
    Form as EvidenciarForm,
    type ValidatedDictamen as EvidenciarValidatedDictamen
} from "./evidenciar/form";

export const Form = ({
    dictamen
}: {
    dictamen: ValidatedDictamen
}) => ({
    [DictamenEstadoEnum.DICTAMINAR]: <DictaminarForm dictamen={dictamen} />,
    [DictamenEstadoEnum.EVIDENCIAR]: <EvidenciarForm dictamen={dictamen as EvidenciarValidatedDictamen} />,
    [DictamenEstadoEnum.SURTIR]: 'facturar',
    [DictamenEstadoEnum.INVENTARIAR]: 'inventariar',
} as const satisfies Record<ActionDictamenEstadoEnum, React.ReactNode>)[dictamen.estado.id];
