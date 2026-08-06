import type { Archivo } from "@/types/documentos"

export const getFileName = (archivo: Archivo) =>
    `${archivo.nombre}.${archivo.extension}`
