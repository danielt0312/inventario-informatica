import { NonEmptyString } from "@/lib/schemas/common";
import z from "zod";

export interface FormSchema {
    productos: {
        id: number;
        caracteristicas: string;
    }[];
}

export const validator = z.object({
    productos: z
        .array(z
            .object({
                id: z
                    .number()
                    .int(),
                caracteristicas: NonEmptyString
            })
        ).min(1, 'Debes de agregar cuando menos 1 producto')
});
