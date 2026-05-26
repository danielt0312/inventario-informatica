export const DocumentoTipo = {
    FACTURA: 1,
    OFICIO: 2,
    ADQUISICION: 3,
    RESGUARDO: 4,
    PRESTAMO: 5,
    DICTAMEN: 6
} as const;
export type DocumentoTipo = (typeof DocumentoTipo)[keyof typeof DocumentoTipo];

export const ProductoCategoria = {
    COMPUTADORA: 1,
    DISPOSITIVO_ALMACENAMIENTO: 2,
    MEMORIA_ACCESO_ALEATORIO: 3,
} as const;
export type ProductoCategoria = (typeof ProductoCategoria)[keyof typeof ProductoCategoria];
