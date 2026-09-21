import type { DetailedDictaminarDictamen, DetailedPendienteAcuseDictamen, DetailedInventariarDictamen, DetailedSurtirDictamen, DictaminarDictamen, PendienteAcuseDictamen, InventariarDictamen, SurtirDictamen } from "@/types/dictamenes";

type FormAction =
    | DictaminarDictamen
    | PendienteAcuseDictamen
    | InventariarDictamen;

type DetailedFormAction =
    | DetailedDictaminarDictamen
    | DetailedPendienteAcuseDictamen
    | DetailedInventariarDictamen;

type EditableFormAction =
    | SurtirDictamen;

type DetailedEditableFormAction =
    | DetailedSurtirDictamen;

export type {
    FormAction as FormActionDictamen,
    DetailedFormAction as DetailedFormActionDictamen,
    EditableFormAction as EditableFormActionDictamen,
    DetailedEditableFormAction as DetailedEditableFormActionDictamen
}
