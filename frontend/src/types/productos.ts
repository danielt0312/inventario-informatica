import type { ProductoTipoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";

type BaseMarca = TCatalogo;
type BaseCategoria = TCatalogo;
type BaseTipo = TCatalogo<ProductoTipoEnum> & {
    es_tangible: boolean;
};

type AttrCategoria<TCategoria extends BaseCategoria = BaseCategoria> = {
    categoria: TCategoria;
}
type TipoWithCategoria = BaseTipo & AttrCategoria<BaseCategoria>;

type Base<TTipo extends BaseTipo = TipoWithCategoria> = {
    tipo?: TTipo;
    marca: BaseMarca;
    modelo: string;
}

type BaseVariante<TProducto extends Base = Base> = TProducto & {
    id: number;
    descripcion: string;
}

type Variante = BaseVariante;

type Tipo = BaseTipo;
type Marca = BaseMarca;
type Categoria = BaseCategoria;

export type {
    Variante as ProductoVariante,
    Tipo as ProductoTipo,
    Marca as ProductoMarca,
    TipoWithCategoria as ProductoTipoWithCategoria,
    Categoria as ProductoCategoria
}
