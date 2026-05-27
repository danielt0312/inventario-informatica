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

export const DictamenEstado = {
    POR_DICTAMINAR: 1,
    REQUISITADO: 2,
    POR_SURTIR: 3,
    SURTIDO: 4,
    SURTIDO_PARCIAL: 5,
} as const;
export type DictamenEstado = (typeof DictamenEstado)[keyof typeof DictamenEstado];

export const FormValidationError = {
    REQUIRED: 'Este campo es requerido'
} as const;
export type FormValidationError = (typeof FormValidationError)[keyof typeof FormValidationError];
