import { ArrayStandardFile } from "@/lib/schemas/common";
import z from "zod";

export interface Schema {
    archivo: File[] | undefined;
}

export const submitValidator = z.object({
    archivo: ArrayStandardFile
});

