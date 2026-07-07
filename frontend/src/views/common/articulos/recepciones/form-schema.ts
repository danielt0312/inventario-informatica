import type { ObservacionesField, ResultadoEsperadoField } from "./form-fields"

export type ResultadoEsperadoFieldGroup = {
    resultado_esperado: ResultadoEsperadoField;
    observaciones: ObservacionesField;
}

export const resultadoEsperadoFieldGroupDefaultValues: ResultadoEsperadoFieldGroup = {
    resultado_esperado: undefined,
    observaciones: null
}
