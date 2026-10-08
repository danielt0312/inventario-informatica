import { DictamenEstadoEnum } from '@/lib/constants';
import { ActionDictamenStates } from './form-action/constants';
import type { DetailedPorDictaminarDictamen, DetailedPorInventariarDictamen, DetailedPorSurtirDictamen, DetailedSurtidoDictamen, DetailedSurtidoParcialDictamen, Dictamen, DictamenVersion, DictamenVersionWithArchivo, PorDictaminarDictamen, PorInventariarDictamen, PorInventariarDictamenWithOrdenCompra, PorSurtirDictamen, SurtidoDictamen, SurtidoParcialDictamen } from '@/types/dictamenes';
import type { DetailedCorregibleFormActionDictamen, DetailedFormActionDictamen, CorregibleFormActionDictamen, FormActionDictamen } from './form-action/types';

export const esPorDictaminarDictamen = (dictamen: Dictamen): dictamen is PorDictaminarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorDictaminar;

export const esDetailedPorDictaminarDictamen = (dictamen: Dictamen): dictamen is DetailedPorDictaminarDictamen =>
    esPorDictaminarDictamen(dictamen);

export const esPorSurtirDictamen = (dictamen: Dictamen): dictamen is PorSurtirDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorSurtir;

export const esDetailedPorSurtirDictamen = (dictamen: Dictamen): dictamen is DetailedPorSurtirDictamen =>
    esPorSurtirDictamen(dictamen);

export const esPorInventariarDictamen = (dictamen: Dictamen): dictamen is PorInventariarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorInventariar;

export const esDetailedPorInventariarDictamen = (dictamen: Dictamen): dictamen is DetailedPorInventariarDictamen =>
    esPorInventariarDictamen(dictamen);

export const isSurtidoDictamen = (dictamen: Dictamen): dictamen is SurtidoDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.Surtido;

export const isDetailedSurtidoDictamen = (dictamen: Dictamen): dictamen is DetailedSurtidoDictamen =>
    isSurtidoDictamen(dictamen);

export const isSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is SurtidoParcialDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.SurtidoParcial;

export const isDetailedSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is DetailedSurtidoParcialDictamen =>
    isSurtidoParcialDictamen(dictamen);

export const esFormActionDictamen = (dictamen: Dictamen): dictamen is FormActionDictamen =>
    dictamen.estado.id in ActionDictamenStates;

export const esDetailedFormActionDictamen = (dictamen: Dictamen): dictamen is DetailedFormActionDictamen =>
    esFormActionDictamen(dictamen);

export const esCorregibleFormActionDictamen = (dictamen: Dictamen): dictamen is CorregibleFormActionDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorSurtir;

export const esDetailedCorregibleFormActionDictamen = (dictamen: Dictamen): dictamen is DetailedCorregibleFormActionDictamen =>
    esCorregibleFormActionDictamen(dictamen);

export const inventariarDictamenHasOrdenCompra = (dictamen: PorInventariarDictamen): dictamen is PorInventariarDictamenWithOrdenCompra =>
    !!dictamen.orden_compra;

export const dictamenVersionHasArchivo = (version: DictamenVersion): version is DictamenVersionWithArchivo =>
    'archivo' in version && !!version.archivo;
