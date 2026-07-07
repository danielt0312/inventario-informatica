import { DictamenEstadoEnum } from "@/lib/constants";

export const ActionDictamenLabels = ['dictaminar', 'evidenciar', 'inventariar', 'resguardar'] as const;
export type ActionDictamenLabels = (typeof ActionDictamenLabels)[number];

const { DICTAMINAR, EVIDENCIAR, INVENTARIAR, RESGUARDAR } = DictamenEstadoEnum;
export const ActionDictamenEstadoEnum = {
    DICTAMINAR,
    EVIDENCIAR,
    INVENTARIAR,
    RESGUARDAR
};
export type ActionDictamenEstadoEnum = (typeof ActionDictamenEstadoEnum)[keyof typeof ActionDictamenEstadoEnum];

export const ActionDictamenStates = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [ActionDictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [ActionDictamenEstadoEnum.INVENTARIAR]: 'inventariar',
    [ActionDictamenEstadoEnum.RESGUARDAR]: 'resguardar'
} as const satisfies Record<ActionDictamenEstadoEnum, ActionDictamenLabels>;
