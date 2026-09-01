import type { DictamenArchivoFieldType, OficioArchivoFieldType } from "../../partials/form-fields";
import { requiredString } from "@/lib/schemas/common";
import z from "zod";

type Schema = {
    dictamen_archivo_uuid: DictamenArchivoFieldType;
    oficio_archivo_uuid?: OficioArchivoFieldType;
}

const defaultValues: Schema = {
    dictamen_archivo_uuid: undefined,
    oficio_archivo_uuid: undefined
}

const validator = (oficioEsRequerido: boolean) => z.object({
    dictamen_archivo_uuid: requiredString,
    oficio_archivo_uuid: z.string().optional()
}).refine(
    ({ oficio_archivo_uuid }) => !(oficioEsRequerido && oficio_archivo_uuid === undefined),
    {
        error: "Este campo es requerido",
        path: ["oficio_archivo_uuid"]
    }
);

export {
    type Schema as EvidenciarAcuseFormSchema,
    defaultValues as evidenciarAcuseFormDefaultValues,
    validator as evidenciarAcuseFormValidator,
}
