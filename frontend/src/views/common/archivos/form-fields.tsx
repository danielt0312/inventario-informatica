import { FileUploaderField } from "@/components/composed/@tanstack/form/field-components";

export type ArchivoField = File[] | undefined;

export interface PdfArchivoFieldProps extends Omit<React.ComponentProps<typeof FileUploaderField>, 'accept'> {}
export const PdfArchivoField = ({
    ...props
}: PdfArchivoFieldProps) => (
    <FileUploaderField
        accept="application/pdf"
        {...props}
    />
);
