import { DictamenEstadoEnum } from "@/lib/constants";

export const ActionLabels = ['dictaminar', 'evidenciar', 'surtir', 'inventariar', 'resguardar'] as const;
export type ActionLabels = (typeof ActionLabels)[number];
const { DICTAMINAR, EVIDENCIAR, SURTIR, INVENTARIAR, RESGUARDAR } = DictamenEstadoEnum;
export const ActionDictamenEstadoEnum = {
    DICTAMINAR,
    EVIDENCIAR,
    SURTIR,
    INVENTARIAR,
    RESGUARDAR
};
export type ActionDictamenEstadoEnum = (typeof ActionDictamenEstadoEnum)[keyof typeof ActionDictamenEstadoEnum];
export const ActionStates = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [ActionDictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [ActionDictamenEstadoEnum.SURTIR]: 'surtir',
    [ActionDictamenEstadoEnum.INVENTARIAR]: 'inventariar',
    [ActionDictamenEstadoEnum.RESGUARDAR]: 'resguardar'
} as const satisfies Record<ActionDictamenEstadoEnum, ActionLabels>;
