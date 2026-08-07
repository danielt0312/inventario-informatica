import { Field, type FieldProps } from "@/components/ui/field-layout";
import { ArchivoSelectorLayout } from "./selector";
import * as f from "@/components/composed/@tanstack/form/form";

const useFieldContext = () => f.useFieldContext<SelectorFieldType>();

type SelectorLayoutProps = React.ComponentProps<typeof ArchivoSelectorLayout>;
interface SelectorFieldProps extends FieldProps, Omit<SelectorLayoutProps, 'orientation'> {
    selectorOrientation?: SelectorLayoutProps['orientation'];
}
type SelectorFieldType = string | undefined;
function SelectorField({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    selectorOrientation,
    ...props
}: SelectorFieldProps) {
    const field = useFieldContext();

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
            <ArchivoSelectorLayout {...props} />
        </Field>
    );
}

export {
    useFieldContext as useArchivoSelectorFieldContext,
    type SelectorFieldType as ArchivoSelectorFieldType,
    SelectorField as ArchivoSelectorField

}
