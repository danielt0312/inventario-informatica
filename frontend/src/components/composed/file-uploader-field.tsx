import { Field, type FieldProps } from "./field";
import { FileUploader } from "./file-uploader";

export const FileUploaderField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: Omit<React.ComponentProps<typeof FileUploader>, 'children'> & FieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <FileUploader {...props}/>
        </Field>
    );
}
