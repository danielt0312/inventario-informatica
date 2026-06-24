import { NonEmptyString } from "@/lib/schemas/common";
import z from "zod";

export type Schema = {
    nombre: string;
}

export const defaultValues: Schema = {
    nombre: ''
}

export const validator = z.object({
    nombre: NonEmptyString
});
