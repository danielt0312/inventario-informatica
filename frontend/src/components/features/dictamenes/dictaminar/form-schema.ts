import { nullableString, requiredArray, selectedNumberOption } from "@/lib/schemas/common";
import type { DetailedDictaminarDictamen } from "@/types/dictamenes";
import type { DictamenEspecificacionesTecnicasFieldType } from "../fields";
import type { ProductoTipoFieldType } from "../../productos/tipo-field";
import z from "zod";

type AdquisicionFields = {
    id: number;
    especificaciones_tecnicas: DictamenEspecificacionesTecnicasFieldType;
    producto_tipo_id: ProductoTipoFieldType;
    producto_variante_id: ProductoVariante;
}

type Schema = {
    adquisiciones: AdquisicionFields[];
}

const defaultValues = (dictamen: DetailedDictaminarDictamen): Schema => ({
    adquisiciones: dictamen.version_actual.adquisiciones.map((adquisicion) => ({
        id: adquisicion.id,
        especificaciones_tecnicas: null,
        producto_id: undefined,
    }))
});

const validator = z.object({
    adquisiciones: requiredArray(
        z.object({
            id: selectedNumberOption,
            especificaciones_tecnicas: nullableString,
            producto_id: selectedNumberOption
        })
    )
});
