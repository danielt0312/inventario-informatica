import {
    Integer,
    NonEmptyString,
    RequiredArray
} from "@/lib/schemas/common";
import z from "zod";

export interface Schema {
    productos: {
        id: number;
        caracteristicas: string;
    }[];
}

export const validator = z.object({
    productos: RequiredArray(
        z.object({
            id: Integer,
            caracteristicas: NonEmptyString
        })
    )
});
