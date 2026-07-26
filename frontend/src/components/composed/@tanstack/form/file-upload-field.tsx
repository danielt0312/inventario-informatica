import * as Root from "../../file-upload-field";
import { useFieldContext } from "./form";

export type FileUploadField = Root.FileUploadFieldProps['value'];
export const FileUploadField = (props: Root.FileUploadFieldProps) => {
    const field = useFieldContext<FileUploadField>();

    return (
        <Root.FileUploadField
            name={field.name}
            value={field.state.value}
            onValueChange={field.handleChange}
            errors={field.state.meta.errors}
            {...props}
        />
    );
}
