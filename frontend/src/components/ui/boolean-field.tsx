import { RadioGroupField, RadioGroupFieldItem, type RadioGroupFieldItemProps } from "@/components/ui/radio-group-field";
import { cn } from "@/lib/utils";

export type BooleanFieldType = boolean | undefined;
export const BooleanField = ({
    className,
    truthyLabel = "Sí",
    falsyLabel = "No",
    ...props
}: Omit<React.ComponentProps<typeof RadioGroupField>, 'children'> & {
    truthyLabel?: RadioGroupFieldItemProps['label'];
    falsyLabel?: RadioGroupFieldItemProps['label'];
}) => (
    <RadioGroupField
        className={cn("**:data-[slot='radio-group']:flex **:data-[slot='radio-group']:gap-7 **:data-[slot='field']:max-w-fit", className)}
        {...props}
    >
        <RadioGroupFieldItem value="true" label={truthyLabel} />
        <RadioGroupFieldItem value="false" label={falsyLabel} />
    </RadioGroupField>
);
