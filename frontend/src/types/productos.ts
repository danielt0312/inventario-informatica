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
type MarcaAttr<TMarca extends BaseMarca = BaseMarca> = {
    marca: TMarca;
}
type TipoWithCategoria = BaseTipo & CategoriaAttr<BaseCategoria>;
type TipoWithCategoriaAttr = TipoAttr<TipoWithCategoria>;


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
    descripcion: string;
}

type VarianteGenerica = BaseVariante<Generica>;
type VarianteSpec = BaseVariante<Spec>;

type Tipo = BaseTipo;
type Marca = BaseMarca;
type Categoria = BaseCategoria;

export type {
    Generica as ProductoGenerico,
    Spec as ProductoSpec,
    VarianteGenerica as ProductoVarianteGenerica,
    VarianteSpec as ProductoVarianteSpec,
    Tipo as ProductoTipo,
    Marca as ProductoMarca,
    TipoWithCategoria as ProductoTipoWithCategoria,
    Categoria as ProductoCategoria
}
