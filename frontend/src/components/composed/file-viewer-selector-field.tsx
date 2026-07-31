import { Field, type FieldProps } from "./field";
import { FileViewerSelector } from "./file-viewer-selector";

export interface FileViewerSelectorFieldProps extends React.ComponentProps<typeof FileViewerSelector>, FieldProps {
}
export const FileViewerSelectorField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: FileViewerSelectorFieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <FileViewerSelector
                {...props}
            />
        </Field>
    );
}
