import { type AnyFormApi } from "@tanstack/react-form";
import type React from "react";

interface FormProps extends React.ComponentProps<'form'> {
    form: AnyFormApi;
}
export function Form({ form, ...props }: FormProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="contents"
            {...props}
        />
    );
}
