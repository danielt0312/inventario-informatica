import z from "zod";
import type { DiscoTipoFieldType } from "../discos/form-fields";
import { requiredArray, selectedNumberOption } from "@/lib/schemas/common";

type DiscoFields = {
    tipo_id: DiscoTipoFieldType;
}

type Schema = {
    discos: DiscoFields[];
}

const defaultValues: Schema = {
    discos: [],
}

const validator = z.object({
    discos: requiredArray(
        z.object({
            tipo_id: selectedNumberOption,
        })
    )
});

type SchemaOutput = z.output<typeof validator>;
