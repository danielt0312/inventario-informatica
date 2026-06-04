import z from "zod";

export const TrimmedString = z
    .string()
    .trim();

export const NonEmptyString = TrimmedString
    .min(1, 'Este campo es requerido');

export const Email = z
    .email('Debes ingresar una dirección de correo válida');

export const InstitutionalEmail = Email
    .endsWith('@asetamaulipas.gob.mx', 'La dirección debe de ser un correo institucional');

export const RequiredInstitutionalEmail = NonEmptyString
    .pipe(InstitutionalEmail);

export const RequiredFile = z
        .array(z
            .file()
            .max(5_000_000, 'El archivo no debe superar 5MB')
        , 'Debes de adjuntar un archivo')
        .min(1, 'Debes de seleccionar un archivo')
        .max(1, 'Solo puedes subir un archivo');
