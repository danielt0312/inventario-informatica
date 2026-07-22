import z from "zod";

export const trimmedString = (
    params?: Parameters<typeof z.string>[0]
) => z
    .string(params)
    .trim();

export const filledString = (
    params: Parameters<z._ZodString['min']>[1] = 'Este campo es requerido'
) => trimmedString()
    .min(1, params);

export const preprocessUndefinedToString = z
    .transform((v: string | undefined) => v ?? '');

export const requiredString = preprocessUndefinedToString.pipe(filledString());

export const convertEmptyStringToNull = trimmedString()
    .transform(v => v !== '' ? v : null);

export const nullableString = convertEmptyStringToNull
    .nullable();

export const email = (
    params: Parameters<typeof z.email>[0] = 'Debes ingresar una dirección de correo válida'
) => z
    .email(params);

export const institutionalEmail = (
    params: Parameters<z._ZodString['endsWith']>[1] = 'La dirección debe de ser un correo institucional',
) => email()
    .endsWith('@asetamaulipas.gob.mx', params);

export const filledInstitutionalEmail = filledString()
    .pipe(institutionalEmail());

export const requiredInstitutionalEmail = preprocessUndefinedToString.pipe(filledInstitutionalEmail);

const requiredArrayDefaultErrorMessage = 'Debes de agregar cuando menos 1 elemento';
export const requiredArray = <T extends z.ZodType>(
    element: T
) => z
    .array(element, requiredArrayDefaultErrorMessage)
    .min(1, requiredArrayDefaultErrorMessage);

export const file = (
    params: Parameters<typeof z.file>[0] = 'Debes de adjuntar un archivo'
) => z
    .file(params);

export const pdfFile = (
    params: Parameters<z.ZodFile['mime']>[1] = 'El archivo adjuntado debe de ser PDF'
) => file()
    .mime('application/pdf', params);

export const STANDARD_MAX_FILE_SIZE = 5_000_000;
export const STANDARD_MAX_FILE_SIZE_ERROR_MESSAGE = 'El archivo no debe de pesar más de 5MB';

export const standardFile = (
    params: Parameters<z.ZodFile['max']>[1] = STANDARD_MAX_FILE_SIZE_ERROR_MESSAGE
) => file()
    .max(STANDARD_MAX_FILE_SIZE, params);

export const standardPdfFile = (
    params: Parameters<z.ZodFile['max']>[1] = STANDARD_MAX_FILE_SIZE_ERROR_MESSAGE
) => pdfFile()
    .max(STANDARD_MAX_FILE_SIZE, params);

export const requiredIsoDate = (
    params: Parameters<typeof z.iso.date>[0] = 'Debes de proporcionar una fecha'
) => z
    .iso
    .date(params);

export const requiredIsoDateLTEToday = requiredIsoDate()
    .refine(
        v => new Date(v) <= new Date,
        'La fecha debe ser menor o igual que hoy'
    );

export const boolean = (
    params: Parameters<typeof z.boolean>[0] = 'Este campo es requerido'
) => z
    .boolean(params)

export const selectedBooleanOption = z.boolean('Debes de seleccionar una opción');

export const selectedNumberOption = z
    .number('Debes de seleccionar una opción');

export const integer = z
    .int('Debes de ingresar un número entero');

export const positiveInteger = integer
    .positive('Debes de ingresar un número mayor que 0');

export const nullableNumber = z
    .number()
    .nullable();
