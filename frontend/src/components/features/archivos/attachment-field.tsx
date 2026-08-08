import { Field, type FieldProps } from "@/components/ui/field-layout";
import { ArchivoAttachmentLayout, useArchivoAttachmentState } from "./attachment";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { useStore } from "@tanstack/react-form";

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
    value,
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

    const fieldValue = useStore(field.store, (state) => state.value);
    const derivedValue = fieldValue === undefined ? undefined : value;

    return (
        <Field {...fieldProps}>
            <ArchivoAttachmentLayout
                disabled={disabled}
                aria-disabled={disabled}
                orientation={attachmentOrientation}
                value={derivedValue}
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
