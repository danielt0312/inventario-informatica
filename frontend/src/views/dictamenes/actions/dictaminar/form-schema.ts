import {
    NonEmptyString,
    NonEmptyStringToNumber,
    RequiredArray
} from "@/lib/schemas/common";
import z from "zod";

export interface Schema {
    productos: {
        id: string;
        caracteristicas: string;
    }[];
}

export const validator = z.object({
    productos: RequiredArray(
        z.object({
            id: NonEmptyStringToNumber,
            caracteristicas: NonEmptyString
        })
    )
});
