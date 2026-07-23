import type { WithTimestamps } from "./generics";

export type Archivo = WithTimestamps<{
    uuid: string;
    nombre: string | null;
    extension: string;
}>;

export type Documento = Archivo & {
    tipo: string;
};

export type Oficio = Documento & {
    folio: string;
};

export type Factura = Documento & {
    fecha_emision: string;
};
