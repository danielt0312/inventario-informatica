import { requiredArray, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProductoField } from "@/views/common/productos/form-fields";
import type { CaracteristicasField } from "./form-fields";
import type { DetailedActionDictaminar as DetailedActionDictaminarDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import z from "zod";

export type Schema = {
    adquisiciones: {
        id: number;
        caracteristicas: CaracteristicasField;
        producto_id: ProductoField;
    }[];
}

export const defaultValues = (dictamen: DetailedActionDictaminarDictamen): Schema => ({
    adquisiciones: dictamen.version_actual.adquisiciones.map((adquisicion) => ({
        id: adquisicion.id,
        caracteristicas: undefined,
        producto_id: undefined,
    }))
});

export const validator = z.object({
    adquisiciones: requiredArray(
        z.object({
            id: selectedNumberOption,
            caracteristicas: requiredString,
            producto_id: selectedNumberOption
        })
    )
});
