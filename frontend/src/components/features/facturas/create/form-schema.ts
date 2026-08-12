import { requiredIsoDateLTEToday, requiredString } from "@/lib/schemas/common";
import type { ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import type { FacturaFechaEmisionFieldType, FacturaFolioFieldType } from "./form-fields";
import type { OrdenCompraFieldType } from "../../orden_compras/form-fields";
import z from "zod";

type Schema = {
    folio: FacturaFolioFieldType;
    orden_compra_id: OrdenCompraFieldType;
    fecha_emision: FacturaFechaEmisionFieldType;
    archivo_uuid: ArchivoUploaderFieldType;
}

const defaultValues: Schema = {
    folio: undefined,
    orden_compra_id: undefined,
    fecha_emision: undefined,
    archivo_uuid: undefined
}

const validator = z.object({
    folio: requiredString,
    orden_compra_id: z.number('Debes de adjuntar una orden de compra'),
    fecha_emision: requiredIsoDateLTEToday,
    archivo_uuid: requiredString
});

type SchemaOutput = z.output<typeof validator>;

export {
    type SchemaOutput as CreateFacturaSchemaOutput,
    defaultValues as createFacturaDefaultValues,
    validator as createFacturaValidator,
}
