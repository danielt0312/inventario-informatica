import { NonEmptyStringToNumber } from "@/lib/schemas/common";

export type Field = string;
export const defaultValue: Field = '';
export const validator = NonEmptyStringToNumber;
