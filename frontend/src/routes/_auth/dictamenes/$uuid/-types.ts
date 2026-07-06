import type {
    Dictamen,
    DictamenEstado,
    DictamenWithDictamenProductos,
} from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";

export type ActionDictamenEstado = DictamenEstado<ActionDictamenEstadoEnum>;
export type ActionDictamen = Dictamen<ActionDictamenEstado>;
export type ActionDictamenWithDictamenProductos = DictamenWithDictamenProductos<ActionDictamen>;
