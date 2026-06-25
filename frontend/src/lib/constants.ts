export const DocumentoTipoEnum = {
    FACTURA: 1,
    OFICIO: 2,
    ADQUISICION: 3,
    RESGUARDO: 4,
    PRESTAMO: 5,
    DICTAMEN: 6
} as const;
export type DocumentoTipoEnum = (typeof DocumentoTipoEnum)[keyof typeof DocumentoTipoEnum];

export const DictamenEstadoEnum = {
    DICTAMINAR: 1,
    EVIDENCIAR: 2,
    SURTIR: 3,
    INVENTARIAR: 4,
    SURTIDO: 5,
    SURTIDO_PARCIAL: 6
} as const;
export type DictamenEstadoEnum = (typeof DictamenEstadoEnum)[keyof typeof DictamenEstadoEnum];

export const ProductoCategoriaEnum = {
    COMPUTADORA: 1,
    DISPOSITIVO_ALMACENAMIENTO: 2,
    MEMORIA_ACCESO_ALEATORIO: 3,
    TELEFONIA: 4,
    REDES: 5,
    HERRAMIENTA: 6,
    AUDIO: 7,
    CAMARA_VIDEO: 8,
    PROYECCION: 9,
    IMPRESORA: 10,
    PERIFERICO: 11,
    ELECTRICO: 12,
    ESCANER: 13
} as const;
export type ProductoCategoriaEnum = (typeof ProductoCategoriaEnum)[keyof typeof ProductoCategoriaEnum];

export const ProductoTipoEnum = {
    COMPUTADORA_ESCRITORIO: 1,
    COMPUTADORA_PORTATIL: 2,
    SERVIDOR: 3,
    TABLET: 4,
    DISCO: 5,
    RAM: 6,
    TELEFONO: 7,
    ACCESS_POINT: 8,
    ANTENA: 9,
    FIREWALL: 10,
    MODEM: 11,
    PANEL_PARCHEO: 12,
    RACK: 13,
    ROUTER: 14,
    SWITCH: 15,
    ADAPTADOR: 16,
    MODULO_RECEPTOR: 17,
    APUNTADOR_OPTICO: 18,
    CAJA_CONECTIVIDAD: 19,
    LECTOR_CODIGOS: 20,
    RELOJ_CHECADOR: 21,
    BOCINA: 22,
    BOCINA_AMBIENTAL: 23,
    CONSOLA: 24,
    MICROFONO: 25,
    CAMARA_VIDEO: 26,
    CAMARA_FOTOGRAFICA: 27,
    CAMARA_WEB: 28,
    CONCENTRADOR: 29,
    PANTALLA_RETRACTIL: 30,
    PROYECTOR: 31,
    UNIDAD_VIDEO: 32,
    IMPRESORA: 33,
    IMPRESORA_MULTIFUNCIONAL: 34,
    PLOTTER: 35,
    MONITOR: 36,
    UNIDAD_DISCO_OPTICO: 37,
    TECLADO: 38,
    MOUSE: 39,
    MODULO_BATERIA: 40,
    UPS: 41,
    ESCANER: 42
} as const;
export type ProductoTipoEnum = (typeof ProductoTipoEnum)[keyof typeof ProductoTipoEnum];

export const ProductoTipoProductoCategoriaMap: Record<ProductoTipoEnum, ProductoCategoriaEnum> = {
    [ProductoTipoEnum.COMPUTADORA_ESCRITORIO]: ProductoCategoriaEnum.COMPUTADORA,
    [ProductoTipoEnum.COMPUTADORA_PORTATIL]: ProductoCategoriaEnum.COMPUTADORA,
    [ProductoTipoEnum.SERVIDOR]: ProductoCategoriaEnum.COMPUTADORA,
    [ProductoTipoEnum.TABLET]: ProductoCategoriaEnum.COMPUTADORA,
    [ProductoTipoEnum.DISCO]: ProductoCategoriaEnum.DISPOSITIVO_ALMACENAMIENTO,
    [ProductoTipoEnum.RAM]: ProductoCategoriaEnum.MEMORIA_ACCESO_ALEATORIO,
    [ProductoTipoEnum.TELEFONO]: ProductoCategoriaEnum.TELEFONIA,
    [ProductoTipoEnum.ACCESS_POINT]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.ANTENA]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.FIREWALL]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.MODEM]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.PANEL_PARCHEO]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.RACK]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.ROUTER]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.SWITCH]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.ADAPTADOR]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.MODULO_RECEPTOR]: ProductoCategoriaEnum.REDES,
    [ProductoTipoEnum.APUNTADOR_OPTICO]: ProductoCategoriaEnum.HERRAMIENTA,
    [ProductoTipoEnum.CAJA_CONECTIVIDAD]: ProductoCategoriaEnum.HERRAMIENTA,
    [ProductoTipoEnum.LECTOR_CODIGOS]: ProductoCategoriaEnum.HERRAMIENTA,
    [ProductoTipoEnum.RELOJ_CHECADOR]: ProductoCategoriaEnum.HERRAMIENTA,
    [ProductoTipoEnum.BOCINA]: ProductoCategoriaEnum.AUDIO,
    [ProductoTipoEnum.BOCINA_AMBIENTAL]: ProductoCategoriaEnum.AUDIO,
    [ProductoTipoEnum.CONSOLA]: ProductoCategoriaEnum.AUDIO,
    [ProductoTipoEnum.MICROFONO]: ProductoCategoriaEnum.AUDIO,
    [ProductoTipoEnum.CAMARA_VIDEO]: ProductoCategoriaEnum.CAMARA_VIDEO,
    [ProductoTipoEnum.CAMARA_FOTOGRAFICA]: ProductoCategoriaEnum.CAMARA_VIDEO,
    [ProductoTipoEnum.CAMARA_WEB]: ProductoCategoriaEnum.CAMARA_VIDEO,
    [ProductoTipoEnum.CONCENTRADOR]: ProductoCategoriaEnum.PROYECCION,
    [ProductoTipoEnum.PANTALLA_RETRACTIL]: ProductoCategoriaEnum.PROYECCION,
    [ProductoTipoEnum.PROYECTOR]: ProductoCategoriaEnum.PROYECCION,
    [ProductoTipoEnum.UNIDAD_VIDEO]: ProductoCategoriaEnum.PROYECCION,
    [ProductoTipoEnum.IMPRESORA]: ProductoCategoriaEnum.IMPRESORA,
    [ProductoTipoEnum.IMPRESORA_MULTIFUNCIONAL]: ProductoCategoriaEnum.IMPRESORA,
    [ProductoTipoEnum.PLOTTER]: ProductoCategoriaEnum.IMPRESORA,
    [ProductoTipoEnum.MONITOR]: ProductoCategoriaEnum.PERIFERICO,
    [ProductoTipoEnum.UNIDAD_DISCO_OPTICO]: ProductoCategoriaEnum.PERIFERICO,
    [ProductoTipoEnum.TECLADO]: ProductoCategoriaEnum.PERIFERICO,
    [ProductoTipoEnum.MOUSE]: ProductoCategoriaEnum.PERIFERICO,
    [ProductoTipoEnum.MODULO_BATERIA]: ProductoCategoriaEnum.ELECTRICO,
    [ProductoTipoEnum.UPS]: ProductoCategoriaEnum.ELECTRICO,
    [ProductoTipoEnum.ESCANER]: ProductoCategoriaEnum.ESCANER
}

export const dictamenProductoTiposRequierenNumeroInventario: ProductoTipoEnum[] = [
    ProductoTipoEnum.RAM,
    ProductoTipoEnum.MONITOR,
    ProductoTipoEnum.DISCO,
    ProductoTipoEnum.TECLADO,
    ProductoTipoEnum.CAMARA_WEB,
    ProductoTipoEnum.BOCINA_AMBIENTAL,
    ProductoTipoEnum.UNIDAD_DISCO_OPTICO
] as const;
