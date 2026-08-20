import type { DetailedDictaminarDictamen, DetailedEvidenciarDictamen, DetailedInventariarDictamen, DetailedPorSurtirDictamen, DictaminarDictamen, EvidenciarDictamen, InventariarDictamen, PorSurtirDictamen } from "@/types/dictamenes";

type FormAction =
    | DictaminarDictamen
    | EvidenciarDictamen
    | InventariarDictamen;

type DetailedFormAction =
    | DetailedDictaminarDictamen
    | DetailedEvidenciarDictamen
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
