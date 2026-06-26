import { NonEmptyString } from "@/lib/schemas/common";
import type { NombreField } from "./form-fields";
import z from "zod";

export type Schema = {
    nombre: NombreField;
}

export const defaultValues: Schema = {
    nombre: ''
}

export const validator = z.object({
    nombre: NonEmptyString
});
