import {
    ArrayStandardFile,
    RequiredIsoDateLTEToday
} from "@/lib/schemas/common";
import z from "zod";

export type Schema = {
    fecha_emision: string;
    archivo: File[];
}

export const defaultValues: Schema = {
    fecha_emision: '',
    archivo: []
}

export const validator = z.object({
    fecha_emision: RequiredIsoDateLTEToday,
    archivo: ArrayStandardFile
})
