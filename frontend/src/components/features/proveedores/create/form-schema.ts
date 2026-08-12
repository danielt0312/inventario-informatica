import { requiredString } from "@/lib/schemas/common";
import type { ProveedorNombreFieldType, ProveedorRfcFieldType } from "./form-fields"
import z from "zod";

type Schema = {
    nombre: ProveedorNombreFieldType;
    rfc: ProveedorRfcFieldType;
}

const defaultValues: Schema = {
    nombre: undefined,
    rfc: undefined,
}

const validator = z.object({
    nombre: requiredString,
    rfc: requiredString
});

type OutputSchema = z.output<typeof validator>;

export {
    type Schema as CreateProveedorSchema,
    type OutputSchema as CreateProveedorOutputSchema,
    defaultValues as createProveedorDefaultValues,
    validator as createProveedorValidator
}
