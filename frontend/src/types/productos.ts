import type { TCatalogo } from "./generics";

export type ProductoMarca = TCatalogo;
export type ProductoCategoria = TCatalogo;
export type ProductoTipo = TCatalogo;
export type ProductoCategoriaWithTipos = ProductoCategoria & {
    productos: ProductoTipo[];
}
export type ProductoTipoWithCategoria = ProductoTipo & {
    categoria: ProductoCategoria;
};
export type Producto = TCatalogo & {
    tipo: ProductoTipo;
    marca: ProductoMarca;
};
