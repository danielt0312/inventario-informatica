import { PdfFileField } from "@/views/common/archivos/form-fields";

export type DictamenArchivoField = PdfFileField;
export const DictamenArchivoField = ({
    label = "Adjuntar evidencia de dictamen recibido",
    ...props
}: React.ComponentProps<typeof PdfFileField>) => (
    <PdfFileField
        label={label}
        {...props}
    />
);
