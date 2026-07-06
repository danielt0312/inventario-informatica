import type { DictamenEstadoEnum, DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { Producto, ProductoCategoria, ProductoMarca, ProductoTipo } from "./productos";

export type DictamenEstado<T extends DictamenEstadoEnum = DictamenEstadoEnum> = TCatalogo<T>
export type Dictamen<TDictamenEstado extends DictamenEstado = DictamenEstado> = {
    id: number;
    uuid: string;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
    estado: TDictamenEstado;
    oficio: Oficio;
    documento: Documento | null;
}
export type AttributeProductoDictamenProducto<TProductoCategoria extends ProductoCategoria = ProductoCategoria, TProductoTipo extends ProductoTipo = ProductoTipo, TProductoMarca extends ProductoMarca = ProductoMarca, TProducto extends Producto = Producto> = {
    categoria: TProductoCategoria;
    tipo: TProductoTipo;
    marca: TProductoMarca | null;
    modelo: TProducto | null;
}
export type DictamenProducto<TAttributeProductoDictamenProducto extends AttributeProductoDictamenProducto = AttributeProductoDictamenProducto> = {
    id: number;
    cantidad: number;
    caracteristicas: string | null;
    empleado: TCatalogo;
    producto: TAttributeProductoDictamenProducto
}
export type DictamenWithDictamenProductos<TDictamen extends Dictamen = Dictamen, TDictamenProducto extends DictamenProducto = DictamenProducto> = TDictamen & {
    dictamen_productos: TDictamenProducto[];
};

export type DictaminarDictamenEstado = DictamenEstado<typeof DictamenEstadoEnum.DICTAMINAR>;
export type DictaminarDictamen = Dictamen<DictaminarDictamenEstado>;
export type DictaminarAttributeProductoDictamenProducto = AttributeProductoDictamenProducto<ProductoCategoria, ProductoTipo, ProductoMarca, Producto>;
export type DictaminarDictamenProducto = DictamenProducto<DictaminarAttributeProductoDictamenProducto>;
export type DictaminarDictamenWithDictamenProductos = DictamenWithDictamenProductos<DictaminarDictamen, DictaminarDictamenProducto>;

export type DictaminadoDictamenEstado<TDictamenEstado extends DictaminadoDictamenEstadoEnum = DictaminadoDictamenEstadoEnum> = DictamenEstado<TDictamenEstado>;
export type DictaminadoAttributeProductoDictamenProducto = Omit<AttributeProductoDictamenProducto<ProductoCategoria, ProductoTipo, ProductoMarca, Producto>, 'marca' | 'modelo'> & {
    marca: NonNullable<AttributeProductoDictamenProducto['marca']>;
    modelo: NonNullable<AttributeProductoDictamenProducto['modelo']>;
}
export type DictaminadoDictamenProducto = Omit<DictamenProducto<DictaminadoAttributeProductoDictamenProducto>, 'caracteristicas'> & {
    caracteristicas: NonNullable<DictamenProducto['caracteristicas']>;
}
export type DictaminadoDictamen<TDictaminadoDictamenEstado extends DictaminadoDictamenEstado = DictaminadoDictamenEstado> = Omit<Dictamen<TDictaminadoDictamenEstado>, 'documento'> & {
    documento: NonNullable<Dictamen['documento']>
}
export type DictaminadoDictamenWithDictamenProductos<TDictaminadoDictamen extends DictaminadoDictamen = DictaminadoDictamen, TDictaminadoDictamenProducto extends DictaminadoDictamenProducto = DictaminadoDictamenProducto> = DictamenWithDictamenProductos<TDictaminadoDictamen, TDictaminadoDictamenProducto>;

export type SurtirDictamenEstado = DictaminadoDictamenEstado<typeof DictaminadoDictamenEstadoEnum.SURTIR>;
export type SurtirDictamen = DictaminadoDictamen<SurtirDictamenEstado>;
export type SurtirDictamenWithDictamenProductos = DictaminadoDictamenWithDictamenProductos<SurtirDictamen>;
