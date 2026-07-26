import { Field, type FieldProps } from "./field";
import { FileUpload } from "./file-upload";

export interface FileUploadFieldProps extends Omit<React.ComponentProps<typeof FileUpload>, 'children' | 'label'>, FieldProps {
    fileUploadLabel?: React.ComponentProps<typeof FileUpload>['label'];
}
export const FileUploadField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    fileUploadLabel,
    ...props
}: FileUploadFieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <FileUpload
                label={fileUploadLabel}
                disabled={disabled}
                required={required}
                {...props}
            />
        </Field>
    );
}
