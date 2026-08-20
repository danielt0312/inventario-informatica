import { DictamenEstadoEnum } from '@/lib/constants';
import { DictamenProducto } from '@/lib/utils';
import { ActionDictamenStates } from './-constants';
import type { DetailedDictaminarDictamen, DetailedInventariarDictamen, DetailedPorSurtirDictamen, DetailedSurtidoDictamen, DetailedSurtidoParcialDictamen, Dictamen, DictamenAdquisicion, DictamenAdquisicionWithArticulo, DictamenVersion, DictamenVersionWithArchivo, DictaminarDictamen, InventariarDictamen, InventariarDictamenWithOrdenCompra, PorSurtirDictamen, SurtidoDictamen, SurtidoParcialDictamen } from '@/types/dictamenes';
import type { DetailedEditableFormActionDictamen, DetailedFormActionDictamen, EditableFormActionDictamen, FormActionDictamen } from './-types';

export const isDictaminarDictamen = (dictamen: Dictamen): dictamen is DictaminarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.DICTAMINAR;

export const isDetailedDictaminarDictamen = (dictamen: Dictamen): dictamen is DetailedDictaminarDictamen =>
    isDictaminarDictamen(dictamen);

export const isPorSurtirDictamen = (dictamen: Dictamen): dictamen is PorSurtirDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.POR_SURTIR;

export const isDetailedPorSurtirDictamen = (dictamen: Dictamen): dictamen is DetailedPorSurtirDictamen =>
    isPorSurtirDictamen(dictamen);

export const isInventariarDictamen = (dictamen: Dictamen): dictamen is InventariarDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.INVENTARIAR;

export const isDetailedInventariarDictamen = (dictamen: Dictamen): dictamen is DetailedInventariarDictamen =>
    isInventariarDictamen(dictamen);

export const isSurtidoDictamen = (dictamen: Dictamen): dictamen is SurtidoDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.SURTIDO;

export const isDetailedSurtidoDictamen = (dictamen: Dictamen): dictamen is DetailedSurtidoDictamen =>
    isSurtidoDictamen(dictamen);

export const isSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is SurtidoParcialDictamen =>
    dictamen.estado.id === DictamenEstadoEnum.SURTIDO_PARCIAL;

export const isDetailedSurtidoParcialDictamen = (dictamen: Dictamen): dictamen is DetailedSurtidoParcialDictamen =>
    isSurtidoParcialDictamen(dictamen);

export const isActionFormDictamen = (dictamen: Dictamen): dictamen is FormActionDictamen =>
    dictamen.estado.id in ActionDictamenStates;

export const isDetailedActionFormDictamen = (dictamen: Dictamen): dictamen is DetailedFormActionDictamen =>
    isActionFormDictamen(dictamen);

export const isEditableFormActionDictamen = (dictamen: Dictamen): dictamen is EditableFormActionDictamen =>
    isPorSurtirDictamen(dictamen);

export const isDetailedEditableFormActionDictamen = (dictamen: Dictamen): dictamen is DetailedEditableFormActionDictamen =>
    isDetailedPorSurtirDictamen(dictamen);

export const adquisicionHasArticulo = (adquisicion: DictamenAdquisicion): adquisicion is DictamenAdquisicionWithArticulo =>
    'producto_tipo' in adquisicion && DictamenProducto.tipoRequiereNumeroInventario(adquisicion.producto_tipo.id)
    || 'producto' in adquisicion && DictamenProducto.tipoRequiereNumeroInventario(adquisicion.producto.tipo.id);

export const inventariarDictamenHasOrdenCompra = (dictamen: InventariarDictamen): dictamen is InventariarDictamenWithOrdenCompra =>
    !!dictamen.orden_compra;

export const dictamenVersionHasArchivo = (version: DictamenVersion): version is DictamenVersionWithArchivo =>
    'archivo' in version && !!version.archivo;
