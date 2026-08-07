import { Field, type FieldProps } from "@/components/ui/field-layout";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { ArchivoUploaderLayout } from "./uploader";

const useUploaderFieldContext = useArchivoFieldContext;

type UploaderProps = React.ComponentProps<typeof ArchivoUploaderLayout>;
interface UploaderFieldProps extends Omit<UploaderProps, 'orientation'>, FieldProps {
    uploaderOrientation?: UploaderProps['orientation'];
}

type UploaderFieldType = string | undefined;
function UploaderField({
    className,
    description,
    disabled,
    errors,
    required,
    orientation,
    uploaderOrientation,
    label = 'Adjuntar archivo',
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
                onValueChange={(value) => field.handleChange(value?.uuid)}
                onMutation={{
                    options: {
                        onError: (error) => {
                            const errorMessage = error.response?.data.message || error.message;
                            field.setErrorMap({
                                onSubmit: errorMessage
                            })
                        },
                        onMutate: () => {
                            field.setErrorMap({
                                onSubmit: undefined
                            });
                        }
                    }
                }}
                onRedoClick={() => field.setErrorMap({ onSubmit: undefined })}
                {...props}
            />
        </Field>
    );
}

export {
    type UploaderFieldType as ArchivoUploaderFieldType,
    useUploaderFieldContext as useArchivoUploaderFieldContext,
    UploaderField as ArchivoUploaderField
}
