import * as Root from "../../file-uploader-field";
import { useFieldContext } from "./form";

export const FileUploaderField = (props: Root.FileUploaderFieldProps) => {
    const field = useFieldContext<Root.FileUploaderFieldProps['value']>();

    return (
        <Root.FileUploaderField
            name={field.name}
            value={field.state.value}
            onValueChange={field.handleChange}
            errors={field.state.meta.errors}
            {...props}
        />
    );
}
