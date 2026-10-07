import type { ProductoTipoEnum, ProductoTipoGenericos, ProductoTipoSpec } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Disco } from "./articulos/discos";
import type { Ram } from "./articulos/rams";
import type { Licencia } from "./licencias";
import type { Computadora } from "./computadoras";
import type { Camara } from "./camaras";

type BaseMarca = TCatalogo;
type BaseCategoria = TCatalogo;
type BaseTipo<TValue extends ProductoTipoEnum = ProductoTipoEnum> = TCatalogo<TValue> & {
    es_tangible: boolean;
};

type AttrCategoria<TCategoria extends BaseCategoria = BaseCategoria> = {
    categoria: TCategoria;
}
type TipoWithCategoria<TTipo extends ProductoTipoEnum = ProductoTipoEnum> = BaseTipo<TTipo> & AttrCategoria<BaseCategoria>;

type BaseIdentidad = {
    marca: BaseMarca;
    modelo: string;
}

type BaseVarianteSpec =
    | { tipo: BaseTipo<typeof ProductoTipoSpec.Disco>; spec: Disco }
    | { tipo: BaseTipo<typeof ProductoTipoSpec.Ram>; spec: Ram }
    | { tipo: BaseTipo<typeof ProductoTipoSpec.Licencia>; spec: Licencia }
    | { tipo: BaseTipo<typeof ProductoTipoSpec.Computadora>; spec: Computadora }
    | { tipo: BaseTipo<typeof ProductoTipoSpec.Camara>; spec: Camara }
    | { tipo: BaseTipo<ProductoTipoGenericos>; spec?: never }

type BaseVarianteGenerica = {
    tipo: BaseTipo<ProductoTipoGenericos>;
}

type Base = {
    id: number;
    descripcion: string;
}

type BaseGenerica = BaseIdentidad & BaseVarianteGenerica & Base;

type BaseVariante = BaseIdentidad & BaseVarianteSpec & Base

type VarianteDe<T extends ProductoTipoEnum> =
    Extract<BaseVariante, { tipo: { id: T } }>;

type Variante = BaseVariante;
type VarianteGenerica = BaseGenerica;

type Tipo = BaseTipo;
type Marca = BaseMarca;
type Categoria = BaseCategoria;

export type {
    Variante as ProductoVariante,
    VarianteDe as ProductoVarianteDe,
    Tipo as ProductoTipo,
    Marca as ProductoMarca,
    TipoWithCategoria as ProductoTipoWithCategoria,
    Categoria as ProductoCategoria,
    VarianteGenerica as ProductoVarianteGenerica
}
