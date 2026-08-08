import { Field, type FieldProps } from "@/components/ui/field-layout";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { ArchivoUploaderLayout } from "./uploader";
import { useStore } from "@tanstack/react-form";

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
    value,
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

    const fieldValue = useStore(field.store, (state) => state.value);
    const derivedValue = fieldValue === undefined ? undefined : value;

    return (
        <Field {...fieldProps}>
            <ArchivoUploaderLayout
                value={derivedValue}
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
