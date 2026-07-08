import { PdfArchivoField, type PdfArchivoFieldProps } from "@/views/common/archivos/form-fields";

export type DictamenArchivoField = PdfArchivoField;
export const DictamenArchivoField = ({
    label = "Adjuntar evidencia de dictamen recibido",
    ...props
}: PdfArchivoFieldProps) => (
    <PdfArchivoField
        label={label}
        {...props}
    />
);
