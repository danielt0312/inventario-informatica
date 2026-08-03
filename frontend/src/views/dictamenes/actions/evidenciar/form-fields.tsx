import { AttachmentField } from "@/components/composed/@tanstack/form/attachment-field";

export type DictamenArchivoField = AttachmentField;
export const DictamenArchivoField = ({
    label = "Adjuntar evidencia de dictamen recibido",
    ...props
}: React.ComponentProps<typeof AttachmentField>) => (
    <AttachmentField
        label={label}
        {...props}
    />
);
