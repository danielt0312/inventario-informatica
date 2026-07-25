import * as Root from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";
import type { DictaminadoDictamenEstadoEnum } from "@/lib/constants";

type Dictaminar = Root.DictaminarDictamen;
type DetailedDictaminar = Root.DetailedDictaminarDictamen;

type Dictaminado = Root.DictaminadoDictamen<Root.BaseDictamenEstado<ActionDictamenEstadoEnum & DictaminadoDictamenEstadoEnum>>;
type DetailedDictaminado = Root.DetailedDictaminadoDictamen<Dictaminado>;

type Action =
    | Dictaminar
    | Dictaminado;

type DetailedAction =
    | DetailedDictaminar
    | DetailedDictaminado;

export type {
    Action as ActionDictamen,
    DetailedAction as DetailedActionDictamen,
    Dictaminar as ActionDictaminarDictamen,
    DetailedDictaminar as DetailedActionDictaminarDictamen,
    Dictaminado as ActionDictaminadoDictamen,
    DetailedDictaminado as DetailedActionDictaminadoDictamen
}
