import { Field, type FieldProps } from "./field";
import { FileUploader } from "./file-uploader";

export interface FileUploaderFieldProps extends Omit<React.ComponentProps<typeof FileUploader>, 'children' | 'label'>, FieldProps {
    fileUploaderLabel?: React.ComponentProps<typeof FileUploader>['label'];
}
export const FileUploaderField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    fileUploaderLabel,
    ...props
}: FileUploaderFieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <FileUploader
                label={fileUploaderLabel}
                {...props}
            />
        </Field>
    );
}
