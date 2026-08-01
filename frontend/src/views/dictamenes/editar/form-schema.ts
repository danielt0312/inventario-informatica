import type { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import type { FechaSolicitudField, FolioField, OficioField } from "../partials/form-fields";

type Schema = {
    adscripcion_id: AdscripcionField;
    folio: FolioField;
    fecha_solicitud: FechaSolicitudField;
    archivo: OficioField;
}
