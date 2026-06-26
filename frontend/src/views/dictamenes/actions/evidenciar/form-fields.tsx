import { PdfArchivoField, type ArchivoField, type PdfArchivoFieldProps } from "@/views/common/archivos/form-fields";

export type DictamenArchivoField = ArchivoField;
export const DictamenArchivoField = ({
    label = "Adjuntar evidencia de dictamen recibido",
    ...props
}: PdfArchivoFieldProps) => (
    <PdfArchivoField
        label={label}
        {...props}
    />
);
