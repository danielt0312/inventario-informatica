import type { EmpleadoFieldType } from "../../externos/empleados/form-fields"
import { requiredArray, selectedNumberOption } from "@/lib/schemas/common";
import z from "zod";

type Schema = {
    empleado_id: EmpleadoFieldType;
    articulos: number[];
}

const defaultValues: Schema = {
    articulos: [],
    empleado_id: undefined
}

const validator = z.object({
    articulos: requiredArray(selectedNumberOption),
    empleado_id: selectedNumberOption
});

export {
    defaultValues as createResguardoDefaultValues,
    validator as createResguardoValidator
}
