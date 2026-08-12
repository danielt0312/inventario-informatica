import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { ArchivoAttachmentLayout, useArchivoAttachmentState } from "./attachment";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { useStore } from "@tanstack/react-form";

const useAttachmentFieldContext = useArchivoFieldContext;

type AttachmentLayoutProps = React.ComponentProps<typeof ArchivoAttachmentLayout>;
interface AttachmentFieldProps extends Omit<CoreFieldLayoutProps, 'errors'>, Omit<AttachmentLayoutProps, 'orientation'> {
    attachmentOrientation?: AttachmentLayoutProps['orientation'];
}
type AttachmentFieldType = string | undefined;
function AttachmentField({
    className,
    description,
    disabled,
    label,
    required,
    orientation,
    attachmentOrientation,
    value,
    ...props
}: AttachmentFieldProps) {
    const field = useAttachmentFieldContext();
    const fieldValue = useStore(field.store, (state) => state.value);
    const derivedValue = fieldValue === undefined ? undefined : value;

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            errors={field.state.meta.errors}
            label={label}
            required={required}
            orientation={orientation}
        >
            <ArchivoAttachmentLayout
                disabled={disabled}
                aria-disabled={disabled}
                orientation={attachmentOrientation}
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
