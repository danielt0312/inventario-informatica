import { DictamenEstadoEnum } from '@/lib/constants';
import type { ActionDictamen, ActionDictaminarDictamen, ActionDictaminadoDictamen, DetailedActionDictaminarDictamen, DetailedActionDictamen, DetailedActionDictaminadoDictamen } from './-types';
import { ActionDictamenEstadoEnum, ActionDictamenStates } from './-constants';
import type { DetailedSurtirDictamen, Dictamen, SurtirDictamen } from '@/types/dictamenes';

export function isSurtirDictamen(dictamen: Dictamen): dictamen is SurtirDictamen {
    return dictamen.estado.id === DictamenEstadoEnum.SURTIR;
}

export function isDetailedSurtirDictamen(dictamen: Dictamen): dictamen is DetailedSurtirDictamen {
    return isSurtirDictamen(dictamen);
}

export function isActionDictamen(dictamen: Dictamen): dictamen is ActionDictamen {
    return dictamen.estado.id in ActionDictamenStates;
}

export function isActionDictaminarDictamen(dictamen: Dictamen): dictamen is ActionDictaminarDictamen {
    return dictamen.estado.id === ActionDictamenEstadoEnum.DICTAMINAR;
}

export function isActionDictaminadoDictamen(dictamen: Dictamen): dictamen is ActionDictaminadoDictamen {
    return !isActionDictaminarDictamen(dictamen);
}

export function isDetailedActionDictamen(dictamen: Dictamen): dictamen is DetailedActionDictamen {
    return isActionDictamen(dictamen);
}

export function isDetailedActionDictaminadoDictamen(dictamen: Dictamen): dictamen is DetailedActionDictaminadoDictamen {
    return dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR;
}

export function isDetailedActionDictaminarDictamen(dictamen: Dictamen): dictamen is DetailedActionDictaminarDictamen {
    return isActionDictaminarDictamen(dictamen);
}
