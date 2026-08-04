import { DictamenEstadoEnum } from '@/lib/constants';
import type { ActionDictamen, ActionDictaminarDictamen, ActionDictaminadoDictamen, DetailedActionDictaminarDictamen, DetailedActionDictamen, DetailedActionDictaminadoDictamen, EditableActionDictamen, DetailedEditableActionDictamen } from './-types';
import { ActionDictamenEstadoEnum, ActionDictamenStates, EditableActionDictamenEnum } from './-constants';
import type { DetailedDictaminadoDictamen, DetailedSurtirDictamen, Dictamen, SurtirDictamen } from '@/types/dictamenes';

export const isSurtirDictamen = (dictamen: Dictamen): dictamen is SurtirDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.SURTIR;

export const isDetailedSurtirDictamen = (dictamen: Dictamen): dictamen is DetailedSurtirDictamen =>
    isSurtirDictamen(dictamen);

export const isActionDictamen = (dictamen: Dictamen): dictamen is ActionDictamen =>
    dictamen.estado.id in ActionDictamenStates;

export const isActionDictaminarDictamen = (dictamen: Dictamen): dictamen is ActionDictaminarDictamen =>
    dictamen.estado.id === ActionDictamenEstadoEnum.DICTAMINAR;

export const isActionDictaminadoDictamen = (dictamen: Dictamen): dictamen is ActionDictaminadoDictamen =>
    !isActionDictaminarDictamen(dictamen);

export const isDetailedActionDictamen = (dictamen: Dictamen): dictamen is DetailedActionDictamen =>
    isActionDictamen(dictamen);

export const isDetailedDictaminadoDictamen = (dictamen: Dictamen): dictamen is DetailedDictaminadoDictamen =>
    dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR;

export const isDetailedActionDictaminadoDictamen = (dictamen: Dictamen): dictamen is DetailedActionDictaminadoDictamen =>
    isDetailedDictaminadoDictamen(dictamen);

export const isDetailedActionDictaminarDictamen = (dictamen: Dictamen): dictamen is DetailedActionDictaminarDictamen =>
    isActionDictaminarDictamen(dictamen);

const DictaminadoValues = new Set<number>(Object.values(EditableActionDictamenEnum));
export const isEditableActionDictamen = (dictamen: Dictamen): dictamen is EditableActionDictamen =>
    DictaminadoValues.has(dictamen.estado.id);

export const isDetailedEditableActionDictamen = (dictamen: Dictamen): dictamen is DetailedEditableActionDictamen =>
    isEditableActionDictamen(dictamen);
