import { DictamenEstadoEnum } from '@/lib/constants';
import type { ActionDictamen, ActionDictaminar, ActionDictaminado, DetailedActionDictaminar, DetailedActionDictamen } from './-types';
import { ActionDictamenEstadoEnum, ActionDictamenStates } from './-constants';
import type { DetailedSurtir as DetailedSurtirDictamen, Dictamen, Surtir as SurtirDictamen } from '@/types/dictamenes';

export function isSurtirDictamen(dictamen: Dictamen): dictamen is SurtirDictamen {
    return dictamen.estado.id === DictamenEstadoEnum.SURTIR;
}

export function isDetailedSurtirDictamen(dictamen: Dictamen): dictamen is DetailedSurtirDictamen {
    return isSurtirDictamen(dictamen) && "version_actual" in dictamen;
}

export function isActionDictamen(dictamen: Dictamen): dictamen is ActionDictamen {
    return dictamen.estado.id in ActionDictamenStates;
}

export function isActionDictaminarDictamen(dictamen: Dictamen): dictamen is ActionDictaminar {
    return dictamen.estado.id === ActionDictamenEstadoEnum.DICTAMINAR;
}

export function isActionDictaminadoDictamen(dictamen: Dictamen): dictamen is ActionDictaminado {
    return !isActionDictaminarDictamen(dictamen);
}

export function isDetailedActionDictamen(dictamen: Dictamen): dictamen is DetailedActionDictamen {
    return isActionDictamen(dictamen);
}

export function isDetailedActionDictaminarDictamen(dictamen: Dictamen): dictamen is DetailedActionDictaminar {
    return isActionDictaminarDictamen(dictamen);
}
