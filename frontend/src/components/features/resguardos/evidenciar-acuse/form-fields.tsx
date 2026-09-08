import { ArchivoUploaderField, type ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";

type AcuseRecibidoFieldType = ArchivoUploaderFieldType;
const AcuseRecibidoField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof ArchivoUploaderField>) => (
    <ArchivoUploaderField
        fieldLayout={{
            label: "Adjuntar acuse de recibido de resguardo",
            required: true,
            ...fieldLayout
        }}
        {...props}
    />
);

export {
    type AcuseRecibidoFieldType as ResguardoAcuseRecibidoFieldType,
    AcuseRecibidoField as ResguardoAcuseRecibidoField,
}
