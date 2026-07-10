import { FileUploaderField } from "@/components/composed/@tanstack/form/file-uploader-field";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";

export type PdfFilesField = FileUploaderField;
export const PdfFilesField = ({
    label = 'Archivo(s)',
    ...props
}: Omit<React.ComponentProps<typeof FileUploaderField>, 'accept'>) => (
    <FileUploaderField
        {...props}
        accept="application/pdf"
        label={label}
    />
);

export type PdfFileField = File | undefined;
export const PdfFileField = ({
    label = 'Archivo',
    ...props
}: Omit<React.ComponentProps<typeof PdfFilesField>, 'maxFiles' | 'value' | 'onValueChange'>) => {
    const field = useFieldContext<PdfFileField>();

    return (
        <PdfFilesField
            {...props}
            label={label}
            maxFiles={1}
            value={field.state.value ? [field.state.value] : []}
            onValueChange={(files) => field.handleChange(files[0])}
        />
    );
}
