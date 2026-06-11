import type { TCatalogo } from "./generics";

export type ProductoMarca = TCatalogo;
export type ProductoCategoria = TCatalogo;
export type ProductoTipo = TCatalogo & {
    categoria: ProductoCategoria;
};
export type Producto = TCatalogo & {
    tipo: ProductoTipo;
    marca: ProductoMarca;
};
