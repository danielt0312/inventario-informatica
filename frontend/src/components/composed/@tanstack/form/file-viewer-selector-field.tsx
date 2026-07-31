import * as Root from "../../file-viewer-selector-field";
import { EyeIcon, PaperclipIcon } from "lucide-react";
import { useFieldContext } from "./form";
import { useStore } from "@tanstack/react-form";
import { Spinner } from "@/components/ui/spinner";
import type { MutationState } from "@tanstack/react-query";

interface FileViewerSelectorFieldProps extends Omit<Root.FileViewerSelectorFieldProps, 'selector' | 'viewer'> {
    selector?: Partial<Root.FileViewerSelectorFieldProps['selector']>;
    viewer?: Partial<Root.FileViewerSelectorFieldProps['viewer']>;
}

export type FileViewerSelectorField = string | undefined;
export const FileViewerSelectorField = ({
    uuid,
    title,
    selector,
    viewer,
    ...props
}: FileViewerSelectorFieldProps) => {
    const field = useFieldContext<FileViewerSelectorField>();
    const value = useStore(field.store, (state) => state.value);
    const isValueUndefined = value === undefined;

    const {
        label = isValueUndefined ? 'Adjuntar' : 'Reemplazar',
        icon: selectorIcon = <PaperclipIcon />,
        ...selectorProps
    } = selector ?? {};

    const {
        tooltipMessage = isValueUndefined ? 'Debes de adjuntar un documento' : 'Ver documento',
        icon: viewerIcon = (mutation: MutationState['status']) => mutation === 'pending' ? <Spinner /> : <EyeIcon />,
        disabled: viewerDisabled = isValueUndefined,
        ...viewerProps
    } = viewer ?? {};

    return (
        <Root.FileViewerSelectorField
            {...props}
            selector={{
                label,
                icon: selectorIcon,
                ...selectorProps
            }}
            viewer={{
                uuid: value,
                tooltipMessage,
                icon: viewerIcon,
                disabled: viewerDisabled,
                ...viewerProps
            }}
        />
    );
}
