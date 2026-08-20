import type { TCatalogo } from "./generics";

export type ProductoMarca = TCatalogo;
export type ProductoCategoria = TCatalogo;
export type ProductoTipo = TCatalogo;
export type Producto = TCatalogo;

export type ProductoCategoriaWithTipos = ProductoCategoria & {
    tipos: ProductoTipo[];
}
export type ProductoWithMarca = Producto & {
    marca: ProductoMarca;

}
export type DetailedProductoTipo = ProductoTipo & {
    categoria: ProductoCategoria;
}
export type DetailedProducto<TTipo extends DetailedProductoTipo = DetailedProductoTipo> = Producto & {
    tipo: TTipo;
    marca: ProductoMarca;
}
