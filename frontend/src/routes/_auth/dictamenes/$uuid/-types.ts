import type { DetailedDictaminarDictamen, DetailedPendienteAcuseDictamen, DetailedInventariarDictamen, DetailedPorSurtirDictamen, DictaminarDictamen, PendienteAcuseDictamen, InventariarDictamen, PorSurtirDictamen } from "@/types/dictamenes";

type FormAction =
    | DictaminarDictamen
    | PendienteAcuseDictamen
    | InventariarDictamen;

type DetailedFormAction =
    | DetailedDictaminarDictamen
    | DetailedPendienteAcuseDictamen
    | DetailedInventariarDictamen;

type EditableFormAction =
    | PorSurtirDictamen;

type DetailedEditableFormAction =
    | DetailedPorSurtirDictamen;

export type {
    FormAction as FormActionDictamen,
    DetailedFormAction as DetailedFormActionDictamen,
    EditableFormAction as EditableFormActionDictamen,
    DetailedEditableFormAction as DetailedEditableFormActionDictamen
}
