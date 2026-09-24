import type { ProductoTipoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";

type BaseMarca = TCatalogo;
type BaseCategoria = TCatalogo;
type BaseTipo = TCatalogo<ProductoTipoEnum> & {
    es_tangible: boolean;
};

type CategoriaAttr<TCategoria extends BaseCategoria = BaseCategoria> = {
    categoria: TCategoria;
}
type TipoAttr<TTipo extends BaseTipo = BaseTipo> = {
    tipo: TTipo;
}
type TiposAttr<TTipo extends BaseTipo = BaseTipo> = {
    tipos: TTipo[];
}
type MarcaAttr<TMarca extends BaseMarca = BaseMarca> = {
    marca: TMarca;
}
type TipoWithCategoria = BaseTipo & CategoriaAttr<BaseCategoria>;
type TipoWithCategoriaAttr = TipoAttr<TipoWithCategoria>;

type CategoriaWithTipos = BaseCategoria & TiposAttr<BaseTipo>;

type Base = {
    modelo: string;
}

type Generica<TTipoAttr extends TipoAttr = TipoWithCategoriaAttr, TMarcaAttr extends MarcaAttr = MarcaAttr> = Base & TTipoAttr & TMarcaAttr;
type Spec<TMarcaAttr extends MarcaAttr = MarcaAttr> = Base & TMarcaAttr;

type Producto = Generica | Spec;

type ProductoAttr<TProducto extends Producto = Producto> = {
    producto: TProducto;
}

type BaseVariante<TProducto extends Producto = Producto> = ProductoAttr<TProducto> & {
    id: number;
}

type Variante = BaseVariante;
type VarianteGenerica = BaseVariante<Generica>;
type VarianteSpec = BaseVariante<Spec>;

export type {
    CategoriaWithTipos as ProductoCategoriaWithTipos,
    Variante as ProductoVariante,
    VarianteGenerica as ProductoVarianteGenerica,
    VarianteSpec as ProductoVarianteSpec,
}
