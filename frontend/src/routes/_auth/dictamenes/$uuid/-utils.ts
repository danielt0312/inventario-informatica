import { DictamenEstadoEnum } from '@/lib/constants';
import { ActionDictamenStates } from './-constants';
import type { DetailedDictaminarDictamen, DetailedInventariarDictamen, DetailedSurtirDictamen, DetailedSurtidoDictamen, DetailedSurtidoParcialDictamen, Dictamen, DictamenVersion, DictamenVersionWithArchivo, DictaminarDictamen, InventariarDictamen, InventariarDictamenWithOrdenCompra, SurtirDictamen, SurtidoDictamen, SurtidoParcialDictamen } from '@/types/dictamenes';
import type { DetailedEditableFormActionDictamen, DetailedFormActionDictamen, EditableFormActionDictamen, FormActionDictamen } from './-types';

export const isDictaminarDictamen = (dictamen: Dictamen): dictamen is DictaminarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.Dictaminar;

export const isDetailedDictaminarDictamen = (dictamen: Dictamen): dictamen is DetailedDictaminarDictamen =>
    isDictaminarDictamen(dictamen);

export const isSurtirDictamen = (dictamen: Dictamen): dictamen is SurtirDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.Surtir;

export const isDetailedSurtirDictamen = (dictamen: Dictamen): dictamen is DetailedSurtirDictamen =>
    isSurtirDictamen(dictamen);

export const isInventariarDictamen = (dictamen: Dictamen): dictamen is InventariarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.Inventariar;

export const isDetailedInventariarDictamen = (dictamen: Dictamen): dictamen is DetailedInventariarDictamen =>
    isInventariarDictamen(dictamen);

export const isSurtidoDictamen = (dictamen: Dictamen): dictamen is SurtidoDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.Surtido;

export const isDetailedSurtidoDictamen = (dictamen: Dictamen): dictamen is DetailedSurtidoDictamen =>
    isSurtidoDictamen(dictamen);

export const isSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is SurtidoParcialDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.SurtidoParcial;

export const isDetailedSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is DetailedSurtidoParcialDictamen =>
    isSurtidoParcialDictamen(dictamen);

export const isActionFormDictamen = (dictamen: Dictamen): dictamen is FormActionDictamen =>
    dictamen.estado.id in ActionDictamenStates;

export const isDetailedActionFormDictamen = (dictamen: Dictamen): dictamen is DetailedFormActionDictamen =>
    isActionFormDictamen(dictamen);

export const isEditableFormActionDictamen = (dictamen: Dictamen): dictamen is EditableFormActionDictamen =>
    isSurtirDictamen(dictamen);

export const isDetailedEditableFormActionDictamen = (dictamen: Dictamen): dictamen is DetailedEditableFormActionDictamen =>
    isDetailedSurtirDictamen(dictamen);

export const inventariarDictamenHasOrdenCompra = (dictamen: InventariarDictamen): dictamen is InventariarDictamenWithOrdenCompra =>
    !!dictamen.orden_compra;

export const dictamenVersionHasArchivo = (version: DictamenVersion): version is DictamenVersionWithArchivo =>
    'archivo' in version && !!version.archivo;
