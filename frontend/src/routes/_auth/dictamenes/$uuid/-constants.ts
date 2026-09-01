import { DictamenEstadoEnum } from "@/lib/constants";

export const ActionDictamenLabels = ['dictaminar', 'evidenciar-acuse', 'inventariar'] as const;
export type ActionDictamenLabels = (typeof ActionDictamenLabels)[number];

const { DICTAMINAR, PENDIENTE_ACUSE, INVENTARIAR } = DictamenEstadoEnum;
export const ActionDictamenEstadoEnum = {
    DICTAMINAR,
    PENDIENTE_ACUSE,
    INVENTARIAR,
}
export type ActionDictamenEstadoEnum = (typeof ActionDictamenEstadoEnum)[keyof typeof ActionDictamenEstadoEnum];

export const ActionDictamenStates = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [ActionDictamenEstadoEnum.PENDIENTE_ACUSE]: 'evidenciar-acuse',
    [ActionDictamenEstadoEnum.INVENTARIAR]: 'inventariar',
} as const satisfies Record<ActionDictamenEstadoEnum, ActionDictamenLabels>;

