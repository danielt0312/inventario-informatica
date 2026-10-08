import { DictamenEstadoEnum } from '@/lib/constants';
import { ActionDictamenStates } from './form-action/constants';
import type { Dictamen, DictamenVersion, DictamenVersionWithArchivo, PorDictaminarDictamen, PorInventariarDictamen, PorInventariarDictamenWithOrdenCompra, PorSurtirDictamen, SurtidoDictamen, SurtidoParcialDictamen } from '@/types/dictamenes';
import type { DetailedCorregibleFormActionDictamen, CorregibleFormActionDictamen, FormActionDictamen } from './form-action/types';

export const esPorDictaminarDictamen = (dictamen: Dictamen): dictamen is PorDictaminarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorDictaminar;

export const esPorSurtirDictamen = (dictamen: Dictamen): dictamen is PorSurtirDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorSurtir;

export const esPorInventariarDictamen = (dictamen: Dictamen): dictamen is PorInventariarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorInventariar;

export const esSurtidoDictamen = (dictamen: Dictamen): dictamen is SurtidoDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.Surtido;

export const esSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is SurtidoParcialDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.SurtidoParcial;

export const esFormActionDictamen = (dictamen: Dictamen): dictamen is FormActionDictamen =>
    dictamen.estado.id in ActionDictamenStates;

export const esCorregibleFormActionDictamen = (dictamen: Dictamen): dictamen is CorregibleFormActionDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.PorSurtir;

export const esDetailedCorregibleFormActionDictamen = (dictamen: Dictamen): dictamen is DetailedCorregibleFormActionDictamen =>
    esCorregibleFormActionDictamen(dictamen);

export const inventariarDictamenHasOrdenCompra = (dictamen: PorInventariarDictamen): dictamen is PorInventariarDictamenWithOrdenCompra =>
    !!dictamen.orden_compra;

export const dictamenVersionHasArchivo = (version: DictamenVersion): version is DictamenVersionWithArchivo =>
    'archivo' in version && !!version.archivo;

export const esSurtibleDictamen = (dictamen: Dictamen) =>
    esPorSurtirDictamen(dictamen) || esSurtidoParcialDictamen(dictamen);

export const esCancelableDictamen = (dictamen: Dictamen) =>
    esPorSurtirDictamen(dictamen);
