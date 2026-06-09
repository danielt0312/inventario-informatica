import { NonEmptyString } from "@/lib/schemas/common";
import z from "zod";

export type Schema = {
    id: string;
    categoria_id: string;
    tipo_id: string;
    marca_id: string;
}

export const defaultValues: Schema = {
    categoria_id: '',
    tipo_id: '',
    marca_id: '',
    id: '',
} as const;

export const validator = z.object({
    categoria_id: NonEmptyString.transform(Number),
    tipo_id: NonEmptyString.transform(Number),
    marca_id: NonEmptyString.transform(Number),
    id: NonEmptyString.transform(Number),
});

export type InputSchema = z.input<typeof validator>;
export type OutputSchema = z.output<typeof validator>;
