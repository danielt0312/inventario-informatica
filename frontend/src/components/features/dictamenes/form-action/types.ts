import type {
    DetailedPorDictaminarDictamen,
    DetailedPendienteAcuseDictamen,
    DetailedPorInventariarDictamen,
    DetailedPorSurtirDictamen,
    PorDictaminarDictamen,
    PendienteAcuseDictamen,
    PorInventariarDictamen,
    PorSurtirDictamen
} from "@/types/dictamenes";

type FormAction =
    | PorDictaminarDictamen
    | PendienteAcuseDictamen
    | PorInventariarDictamen;

type DetailedFormAction =
    | DetailedPorDictaminarDictamen
    | DetailedPendienteAcuseDictamen
    | DetailedPorInventariarDictamen;

type CorregibleFormAction =
    | PorSurtirDictamen;

type DetailedCorregibleFormAction =
    | DetailedPorSurtirDictamen;

export type {
    FormAction as FormActionDictamen,
    DetailedFormAction as DetailedFormActionDictamen,
    CorregibleFormAction as CorregibleFormActionDictamen,
    DetailedCorregibleFormAction as DetailedCorregibleFormActionDictamen
}
