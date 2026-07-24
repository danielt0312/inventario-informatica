import type { WithTimestamps } from "./generics";

export type Archivo = WithTimestamps<{
    uuid: string;
    nombre: string;
    extension: string;
}>;

export type Documento = Archivo & {
    tipo: string;
};

export type Oficio = {
    folio: string;
    archivo: Archivo;
};

export type Factura = {
    fecha_emision: string;
    archivo: Archivo;
};
