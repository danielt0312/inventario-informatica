import * as Dictamen from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";
import type { DictaminadoDictamenEstadoEnum } from "@/lib/constants";

// type ActionDictaminarEstado = BaseActionEstado<typeof DICTAMEN_ESTADO_DICTAMINAR>;
type Dictaminar = Dictamen.Dictaminar;
type DetailedDictaminar = Dictamen.DetailedDictaminar;

type Dictaminado = Dictamen.Dictaminado<Dictamen.BaseEstado<ActionDictamenEstadoEnum & DictaminadoDictamenEstadoEnum>>;
type DetailedDictaminado = Dictamen.DetailedDictaminado<Dictaminado>;

type Action =
    | Dictaminar
    | Dictaminado;

type DetailedAction =
    | DetailedDictaminar
    | DetailedDictaminado;

export type { Action as ActionDictamen, DetailedAction as DetailedActionDictamen, Dictaminar as ActionDictaminar, DetailedDictaminar as DetailedActionDictaminar, Dictaminado as ActionDictaminado, DetailedDictaminado as DetailedActionDictaminado }
