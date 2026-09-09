import z from "zod";
import type { ResguardoAcuseRecibidoFieldType } from "./form-fields"
import { requiredString } from "@/lib/schemas/common";

type Schema = {
    acuse_archivo_uuid: ResguardoAcuseRecibidoFieldType;
}

const defaultValues: Schema = {
    acuse_archivo_uuid: undefined
}

const validator = z.object({
    acuse_archivo_uuid: requiredString
});

type Output = z.output<typeof validator>;

export {
    defaultValues as evidenciarAcuseResguardoDefaultFormValues,
    validator as evidenciarAcuseResguardoValidator,
    type Output as EvidenciarAcuseResguardoSchemaOutput
}
