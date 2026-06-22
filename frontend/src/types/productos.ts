import type { TCatalogo } from "./generics";

export type ProductoMarca = TCatalogo;
export type ProductoCategoria = TCatalogo;
export type ProductoTipo = TCatalogo;
export type ProductoCategoriaWithTipos = ProductoCategoria & {
    tipos: ProductoTipo[];
}
export type ProductoTipoWithCategoria = ProductoTipo & {
    categoria: ProductoCategoria;
}
export type Producto = TCatalogo;
export type ProductoWithTipo = Producto & {
    tipo: ProductoTipo;
}
export type ProductoWithMarca = Producto & {
    marca: ProductoMarca;
}
export type DetailedProducto = Producto & {
    tipo: ProductoTipo;
    marca: ProductoMarca;
};
