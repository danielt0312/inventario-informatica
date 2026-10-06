import type { TCatalogo } from "./generics";

type BaseTipo = TCatalogo;

type Base = {
    tipo: BaseTipo;
}

type Licencia = Base;
type LicenciaTipo = BaseTipo;

export type {
    Licencia,
    LicenciaTipo,
}
