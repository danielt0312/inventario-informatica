import * as Root from "../../checkbox-field";
import { useFieldContext } from "./form";

// todo revisar integracion apropiada

export const CheckboxField = (props: Root.CheckboxFieldProps) => {
    const field = useFieldContext();

    return (
        <Root.CheckboxField
            errors={field.state.meta.errors}
            {...props}
        />
    );
}

export const CheckboxFieldItem = (props: Root.CheckboxFieldItemProps) => {
    const field = useFieldContext<Root.CheckboxFieldItemProps['checked']>();

    return (
        <Root.CheckboxFieldItem
            checked={field.state.value}
            onCheckedChange={(checked) => field.handleChange(checked === true)}
            name={field.name}
            {...props}
        />
    );
};
