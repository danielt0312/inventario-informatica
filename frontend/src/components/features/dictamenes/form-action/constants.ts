import { DictamenEstadoEnum } from "@/lib/constants";

export const ActionDictamenLabels = ['dictaminar', 'evidenciar-acuse', 'inventariar'] as const;
export type ActionDictamenLabels = (typeof ActionDictamenLabels)[number];

const { PorDictaminar, PendienteAcuse, PorInventariar } = DictamenEstadoEnum;
export const ActionDictamenEstadoEnum = {
    PorDictaminar,
    PendienteAcuse,
    PorInventariar,
}
export type ActionDictamenEstadoEnum = (typeof ActionDictamenEstadoEnum)[keyof typeof ActionDictamenEstadoEnum];

export const ActionDictamenStates = {
    [ActionDictamenEstadoEnum.PorDictaminar]: 'dictaminar',
    [ActionDictamenEstadoEnum.PendienteAcuse]: 'evidenciar-acuse',
    [ActionDictamenEstadoEnum.PorInventariar]: 'inventariar',
} as const satisfies Record<ActionDictamenEstadoEnum, ActionDictamenLabels>;

