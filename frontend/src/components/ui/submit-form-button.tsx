import { useFormContext } from "./form-context";
import { SubmitButton } from "./submit-button";

function SubmitFormButton(props: Omit<React.ComponentProps<typeof SubmitButton>, 'isSubmitting'>) {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => {
                console.log('isSubmitting', isSubmitting);

                return <SubmitButton isSubmitting={isSubmitting} {...props} />
            }}
        </form.Subscribe>
    );
}

export { SubmitFormButton }
