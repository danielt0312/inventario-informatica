import z from "zod";
import { NonEmptyStringToNumber } from "@/lib/schemas/common";

export type Schema = {
    id: string;
}

export const defaultValues: Schema = {
    id: ''
}

export const validator = z.object({
    id: NonEmptyStringToNumber
});
