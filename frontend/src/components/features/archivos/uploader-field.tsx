import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import { ArchivoUploaderLayout } from "./uploader";

type FieldType = string | undefined;
function Field({
    value,
    ...props
}: Omit<>) {
    const field = useFieldContext<FieldType>();

    return (
        <ArchivoUploaderLayout
            value={}
        />
    );
}
