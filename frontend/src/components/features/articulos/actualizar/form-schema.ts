import z from "zod";
import type { DiscoTipoFieldType } from "../discos/form-fields";
import { requiredArray, selectedNumberOption } from "@/lib/schemas/common";

type DiscoFields = {
    id: React.Key | undefined;
    tipo_id: DiscoTipoFieldType;
}

type Schema = {
    discos: DiscoFields[];
}

const defaultValues: Schema = {
    discos: []
}

const baseValidator = z.object({
    discos: requiredArray(
        z.object({
            id: z.number("Debes de proporcionar un disco válido"),
            tipo_id: selectedNumberOption,
        })
    )
});

const validator = baseValidator
    .transform((data) => ({
        discos: data.discos.map(disco => disco.id)
    }));

type SchemaOutput = z.output<typeof validator>;
