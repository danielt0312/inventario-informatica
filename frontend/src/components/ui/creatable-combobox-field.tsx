import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { CreatableCombobox } from "@/components/ui/creatable-combobox";
import { useFieldContext } from "./form-context";

type CreatableComboboxFieldType = number | undefined;

interface CreatableComboboxFieldProps extends Omit<React.ComponentProps<typeof CreatableCombobox>, 'children' | 'value' | 'onValueChange'>, Omit<CoreFieldLayoutProps, 'children' | 'errors'> {
}

function CreatableComboboxField ({
    className, description, disabled, label, required, orientation, ...creatableComboboxProps
}: CreatableComboboxFieldProps) {
    const field = useFieldContext<CreatableComboboxFieldType>();

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
        <CreatableCombobox
            value={field.state.value === undefined
                ? undefined
                : String(field.state.value)
            }
            onValueChange={(v) => field.handleChange(v === ''
                ? undefined
                : Number(v))
            }
            {...creatableComboboxProps}
        />
        </FieldLayout>
    );
}

export {
    type CreatableComboboxFieldType,
    type CoreFieldLayoutProps,
    CreatableComboboxField
}
