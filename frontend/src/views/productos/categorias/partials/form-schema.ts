import { NonEmptyStringToNumber } from "@/lib/schemas/common";
import z from "zod";

export type Schema = {
    id: string;
}

export const defaultValues: Schema = {
    id: ''
}

export const validator = z.object({
    id: NonEmptyStringToNumber
});

