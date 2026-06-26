import { NonEmptyStringToNumber } from "@/lib/schemas/common";

export type CatalogoField = string;
export const catalogoDefaultValue: CatalogoField = '';
export const validator = NonEmptyStringToNumber;
