import z from "zod"

type FormSchema = {
    producto_categoria_id: number | null,
    producto_tipo_id: number | null,
    producto_marca_id: number | null,
    producto_id: number | null,
    numero_serie: string | null,
    costo_unitario: string | number | null,
    factura_id: number | null,
    qr_archivo_id: number | null,
    contable: boolean,
}

export const defaultValues: FormSchema = {
    producto_categoria_id: null,
    producto_tipo_id: null,
    producto_marca_id: null,
    producto_id: null,
    numero_serie: null,
    costo_unitario: null,
    factura_id: null,
    qr_archivo_id: null,
    contable: false,
}

export const formValidator = z.object({
    producto_categoria_id: z
        .number('Este campo es requerido')
        .int(),
    producto_tipo_id: z
        .number('Este campo es requerido')
        .int(),
    producto_marca_id: z
        .number('Este campo es requerido')
        .int(),
    producto_id: z
        .number('Este campo es requerido')
        .int(),
    numero_serie: z
        .string()
        .nullable(),
    costo_unitario: z
        .union([z.string(), z.number(), z.null()])
        .transform((val) => (val === '' || val === null ? null : Number(val)))
        .pipe(
            z.number("Este campo debe ser un número")
             .min(0, "El costo no puede ser negativo")
             .nullable()
        ),
    factura_id: z
        .number()
        .int()
        .nullable(),
    qr_archivo_id: z
        .number()
        .int()
        .nullable(),
    contable: z.boolean(),
})
