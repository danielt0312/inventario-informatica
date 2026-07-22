import type { Documento } from "./documentos";
import type { TCatalogo } from "./generics";

export type Proveedor = TCatalogo;

export type OrdenCompra = Documento & {
    id: number;
    fecha_solicitud: string;
    numero_orden: string;
    proveedor: Proveedor;
}
