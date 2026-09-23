import type { DetailedDictaminarDictamen, DetailedPendienteAcuseDictamen, DetailedInventariarDictamen, DetailedSurtirDictamen, DictaminarDictamen, PendienteAcuseDictamen, InventariarDictamen, SurtirDictamen } from "@/types/dictamenes";

type FormAction =
    | DictaminarDictamen
    | PendienteAcuseDictamen
    | InventariarDictamen;

type DetailedFormAction =
    | DetailedDictaminarDictamen
    | DetailedPendienteAcuseDictamen
    | DetailedInventariarDictamen;

type CorregibleFormAction =
    | SurtirDictamen;

type DetailedCorregibleFormAction =
    | DetailedSurtirDictamen;

export type {
    FormAction as FormActionDictamen,
    DetailedFormAction as DetailedCorregibleActionDictamen,
    CorregibleFormAction as CorregibleFormActionDictamen,
    DetailedCorregibleFormAction as DetailedEditableFormActionDictamen
}
