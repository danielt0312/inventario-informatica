import { DictamenEstadoEnum } from "@/lib/constants";

export const ActionDictamenLabels = ['dictaminar', 'evidenciar', 'inventariar'] as const;
export type ActionDictamenLabels = (typeof ActionDictamenLabels)[number];

const { DICTAMINAR, EVIDENCIAR, INVENTARIAR } = DictamenEstadoEnum;
export const ActionDictamenEstadoEnum = {
    DICTAMINAR,
    EVIDENCIAR,
    INVENTARIAR,
};
export type ActionDictamenEstadoEnum = (typeof ActionDictamenEstadoEnum)[keyof typeof ActionDictamenEstadoEnum];

export const ActionDictamenStates = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [ActionDictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [ActionDictamenEstadoEnum.INVENTARIAR]: 'inventariar',
} as const satisfies Record<ActionDictamenEstadoEnum, ActionDictamenLabels>;
