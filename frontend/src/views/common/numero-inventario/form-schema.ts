import { TrimmedString } from "@/lib/schemas/common";

export type Field = string;
export const defaultValue: Field = '';
export const validator = TrimmedString
    .length(11, 'El número de inventario debe contener 11 caracteres');
