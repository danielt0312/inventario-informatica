import { FieldLayout, type FieldLayoutProps } from "@/components/ui/field-layout";
import { ArchivoAttachmentLayout, useArchivoAttachmentState } from "./attachment-layout";
import { useArchivoFieldContext } from "./hooks/use-field-context";

const useAttachmentFieldContext = useArchivoFieldContext;

interface AttachmentFieldProps extends React.ComponentProps<typeof ArchivoAttachmentLayout>, FieldLayoutProps {
}

type AttachmentFieldType = string | undefined;
function AttachmentField({
    value,
    className,
    disabled,
    fieldLayout = {},
    ...props
}: AttachmentFieldProps) {
    const field = useAttachmentFieldContext();
    const derivedValue = field.state.value === undefined ? undefined : value;

    return (
        <FieldLayout
            className={className}
            fieldLayout={{
                disabled,
                errors: field.state.meta.errors,
                ...fieldLayout
            }}
        >
            <ArchivoAttachmentLayout
                disabled={disabled}
                aria-disabled={disabled}
                value={derivedValue}
                {...props}
            />
        </FieldLayout>
    );
}

export {
    type AttachmentFieldType as ArchivoAttachmentFieldType,
    useArchivoAttachmentState as useArchivoAttachmentFieldState,
    useAttachmentFieldContext as useArchivoAttachmentFieldContext,
    AttachmentField as ArchivoAttachmentField
}
