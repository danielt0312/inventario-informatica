import type { UseQueryOptions } from "@tanstack/react-query";
import type { ColumnDef, RowData } from "@tanstack/react-table";

export type TCatalogo<TValue extends number = number> = {
    id: TValue;
    nombre: string;
}

export type TResponse<T> = {
    data: T;
}

export type CatalogoResponse = TResponse<TCatalogo>;
export type CatalogoListResponse = TResponse<TCatalogo[]>;

export interface PaginatedResponse<T>
    extends TResponse<T[]> {
    meta: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    }
}
export type LaravelValidationErrors = Record<string, string[]>

export type WithPrefix<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K];
}

export type OmitQueryOptions<
    TQueryFnData = unknown,
    TError extends Error = Error,
    TData = TQueryFnData
> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    'queryKey' | 'queryFn'
>;

export type Includable<T> = T | null;
export type WithTimestamps<T extends object | never = never> = ([T] extends [never] ? {} : T) & {
    created_at: string;
    updated_at: string;
}

export type TRowDataAccessFn<TRowData extends RowData, TData = unknown> = (row: TRowData) => TData;

type Archivo = { uuid: string; nombre: string };
type Documento = Archivo & { tipo: 'FACTURA' | 'CONTRATO' };
type Factura = { fecha_emision: string; archivo: Archivo };

// El factory ya no asume la forma de TData: recibe un "selector" que dice
// como llegar al Archivo dentro de esa fila. Top-level y anidado son solo
// dos selectores distintos de la misma abstraccion.
function nombreArchivoColumn<TData extends RowData>(
  getArchivo: (row: TData) => Archivo
): ColumnDef<TData, Archivo['nombre']> {
  return {
    id: 'nombre',
    header: 'Nombre del Archivo',
    accessorFn: (row) => getArchivo(row).nombre,
  };
}

// Documento (top-level): el selector es la identidad, Documento YA ES un Archivo
const documentoCols = [nombreArchivoColumn<Documento>((row) => row)];

// Factura (nested): el selector baja un nivel
const facturaCols = [nombreArchivoColumn<Factura>((row) => row.archivo)];

console.log(documentoCols, facturaCols);
