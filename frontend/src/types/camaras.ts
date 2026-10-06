import type { TCatalogo } from "./generics";

type BaseTipo = TCatalogo;

type Base = {
    tipo: BaseTipo;
}

type Camara = Base;
type CamaraTipo = BaseTipo;

export type {
    Camara,
    CamaraTipo
}
