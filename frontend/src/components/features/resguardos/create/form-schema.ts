import type { EmpleadoFieldType } from "../../externos/empleados/form-fields"
import { filledString, requiredArray, selectedNumberOption } from "@/lib/schemas/common";
import z from "zod";

type Schema = {
    empleado_id: EmpleadoFieldType;
    articulos: string[];
}

const defaultValues: Schema = {
    articulos: [],
    empleado_id: undefined
}

const validator = z.object({
    articulos: requiredArray(filledString()),
    empleado_id: selectedNumberOption
});

type SchemaOutput = z.output<typeof validator>;

export {
    defaultValues as createResguardoDefaultValues,
    validator as createResguardoValidator,
    type SchemaOutput as CreateResguardoSchemaOutput
}
