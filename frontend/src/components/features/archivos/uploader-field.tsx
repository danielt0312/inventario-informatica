import { FieldLayout, type FieldLayoutProps } from "@/components/ui/field-layout";
import { useArchivoFieldContext } from "./hooks/use-field-context";
import { ArchivoUploaderLayout } from "./uploader";

const useUploaderFieldContext = useArchivoFieldContext;

type UploaderProps = React.ComponentProps<typeof ArchivoUploaderLayout>;
interface UploaderFieldProps extends UploaderProps, FieldLayoutProps {
}

type UploaderFieldType = string | undefined;
function UploaderField({
    value,
    className,
    fieldLayout = {},
    ...props
}: UploaderFieldProps) {
    const field = useUploaderFieldContext();
    const fieldValue = field.state.value;
    const derivedValue = fieldValue === undefined ? undefined : value;

    return (
        <FieldLayout
            className={className}
            fieldLayout={{
                label: "Adjuntar archivo",
                ...fieldLayout
            }}
        >
            <ArchivoUploaderLayout
                value={derivedValue}
                onValueChange={(value) => field.handleChange(value?.uuid)}
                onMutation={{
                    options: {
                        onError: (error) => {
                            const errorMessage = error.response?.data.message || error.message;
                            field.setErrorMap({
                                onSubmit: errorMessage,
                            });
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
