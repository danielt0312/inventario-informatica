import { requiredArray, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { DictamenEspecificacionesTecnicasFieldType } from "../../partials/form-fields";
import type { ProductoFieldType } from "@/components/features/productos/form-fields";
import type { DetailedDictaminarDictamen } from "@/types/dictamenes";
import z from "zod";

export type Schema = {
    adquisiciones: {
        id: number;
        especificaciones_tecnicas: DictamenEspecificacionesTecnicasFieldType;
        producto_id: ProductoFieldType;
    }[];
}

export const defaultValues = (dictamen: DetailedDictaminarDictamen): Schema => ({
    adquisiciones: dictamen.version_actual.adquisiciones.map((adquisicion) => ({
        id: adquisicion.id,
        especificaciones_tecnicas: undefined,
        producto_id: undefined,
    }))
});

export const validator = z.object({
    adquisiciones: requiredArray(
        z.object({
            id: selectedNumberOption,
            especificaciones_tecnicas: requiredString,
            producto_id: selectedNumberOption
        })
    )
});
