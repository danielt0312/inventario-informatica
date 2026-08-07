import { Field, type FieldProps } from "@/components/ui/field-layout";
import { ArchivoAttachmentLayout, useArchivoAttachmentState } from "./attachment";
import { useArchivoFieldContext } from "./hooks/use-field-context";

const useAttachmentFieldContext = useArchivoFieldContext;

type AttachmentLayoutProps = React.ComponentProps<typeof ArchivoAttachmentLayout>;
interface AttachmentFieldProps extends FieldProps, Omit<AttachmentLayoutProps, 'orientation'> {
    attachmentOrientation?: AttachmentLayoutProps['orientation'];
}
type AttachmentFieldType = string | undefined;
function AttachmentField({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    attachmentOrientation,
    ...props
}: AttachmentFieldProps) {
    const field = useAttachmentFieldContext();

    const fieldProps: FieldProps = {
        className,
        description,
        disabled,
        errors: errors !== undefined
            ? errors
            : field.state.meta.errors,
        label,
        required,
        orientation
    }

    return (
        <Field {...fieldProps}>
            <ArchivoAttachmentLayout
                orientation={attachmentOrientation}
                {...props}
            />
        </Field>
    );
}

export {
    useArchivoAttachmentState as useArchivoAttachmentFieldState,
    useAttachmentFieldContext as useArchivoAttachmentFieldContext,
    type AttachmentFieldType as ArchivoAttachmentFieldType,
    AttachmentField as ArchivoAttachmentField
}
