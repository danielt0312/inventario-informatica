import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { ArchivoUploaderLayout } from "./uploader";

const useUploaderFieldContext = useArchivoFieldContext;

type UploaderProps = React.ComponentProps<typeof ArchivoUploaderLayout>;
interface UploaderFieldProps extends Omit<UploaderProps, 'orientation'>, Omit<CoreFieldLayoutProps, 'errors'> {
    uploaderOrientation?: UploaderProps['orientation'];
}

type UploaderFieldType = string | undefined;
function UploaderField({
    className,
    description,
    disabled,
    required,
    orientation,
    uploaderOrientation,
    value,
    label = 'Adjuntar archivo',
    ...props
}: UploaderFieldProps) {
    const field = useUploaderFieldContext();
    const fieldValue = field.state.value;
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
        </FieldLayout>
    );
}

export {
    type UploaderFieldType as ArchivoUploaderFieldType,
    useUploaderFieldContext as useArchivoUploaderFieldContext,
    UploaderField as ArchivoUploaderField
}
