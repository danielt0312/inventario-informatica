import { Field, type FieldProps } from "@/components/ui/field-layout";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { ArchivoUploaderLayout } from "./uploader";

const useUploaderFieldContext = useArchivoFieldContext;

type UploaderProps = React.ComponentProps<typeof ArchivoUploaderLayout>;
interface UploaderFieldProps extends Omit<UploaderProps, 'orientation'>, FieldProps {
    uploaderOrientation?: UploaderProps['orientation'];
}

function UploaderField({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    uploaderOrientation,
    ...props
}: UploaderFieldProps) {
    const field = useUploaderFieldContext();

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
            <ArchivoUploaderLayout
                orientation={uploaderOrientation}
                {...props}
            />
        </Field>
    );
}

export {
    useUploaderFieldContext as useArchivoUploaderFieldContext,
    UploaderField as ArchivoUploaderField
}
