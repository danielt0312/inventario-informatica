import z, { type ZodType } from "zod";

export const RequiredNumber = z
    .number('Este campo es requerido');

export const TrimmedString = z
    .string()
    .trim();

export const EmptyStringToNull = TrimmedString
    .transform(v => v !== '' ? v : null);

export const NullableString = EmptyStringToNull
    .nullable();

export const NonEmptyString = TrimmedString
    .min(1, 'Este campo es requerido');

export const Email = z
    .email('Debes ingresar una dirección de correo válida');

export const InstitutionalEmail = Email
    .endsWith('@asetamaulipas.gob.mx', 'La dirección debe de ser un correo institucional');

export const RequiredInstitutionalEmail = NonEmptyString
    .pipe(InstitutionalEmail);

export const RequiredArray = <T extends ZodType>(
    schema: T,
    params?: Parameters<typeof z.array>[1],
) => z
    .array(schema, params)
    .min(1, 'Debes de agregar cuando menos 1 elemento');

export const File = z
    .file('Debes de proporcionar un archivo');

export const StandardFile = File
    .max(5_000_000, 'El archivo no debe de pesar más de 5MB');

export const ArrayStandardFiles = z
    .array(StandardFile, 'Este campo es requerido');

export const ArrayStandardFile = ArrayStandardFiles
    .length(1, 'Solo debes de adjuntar 1 archivo')

export const RequiredIsoDate = z
    .iso
    .date('Debes de proporcionar una fecha');

export const RequiredIsoDateLTEToday = RequiredIsoDate
    .refine(
        v => new Date(v) <= new Date,
        'La fecha debe ser menor o igual que hoy'
    );

export const NonEmptyStringToNumber = NonEmptyString
    .transform(Number);

export const Integer = z
    .int('Este campo debe de ser un número entero');

export const PositiveInteger = Integer
    .positive('Este campo debe de ser un número mayor que 0');

export const RequiredPositiveInteger = NonEmptyStringToNumber
    .pipe(PositiveInteger)
