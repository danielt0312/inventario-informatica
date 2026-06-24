import { NonEmptyString } from "@/lib/schemas/common";

export type Field = string;
export const defaultValue: Field = '';
export const validator = NonEmptyString
    .length(11, 'El número de inventario debe de tener 11 caractéres');
