import { ArchivoSelector, ArchivoSelectorAction, ArchivoSelectorActionViewer, type ArchivoSelectorType, ArchivoSelectorActionSwitcher } from "@/components/features/archivos/selector";
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentActions, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@/components/ui/attachment";
import { Spinner } from "@/components/ui/spinner";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import type { Archivo } from "@/types/documentos";
import type { LaravelValidationErrors, TResponse } from "@/types/generics";
import { CircleXIcon, FileTextIcon, RotateCcwIcon, UploadIcon } from "lucide-react";
import React from "react";
import { getFileName } from "./utils";
import { TooltipAttachmentAction } from "@/components/ui/tooltip-attachment-action";
import { formatFileSize } from "@/lib/utils";

type UseMutationOptions = Omit<FormMutation<TResponse<Archivo>, File, LaravelValidationErrors>, 'url' | 'toFormData'>;

const useMutation = (options?: UseMutationOptions) => useFormMutation<TResponse<Archivo>, File>({
    url: 'api/archivos',
    toFormData: (file) => {
        const formData = new FormData;
        formData.append('archivo', file);
        return formData;
    },
    ...options
});

const UploaderMedia = ({
    state = 'idle',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentMedia>, 'children' | 'icon'> & {
    state?: React.ComponentProps<typeof Attachment>['state'];
}) => {
    return (
        <AttachmentMedia variant="icon" {...props}>
            {state === 'idle' && <UploadIcon />}
            {(state === 'uploading' || state === 'processing') && <Spinner />}
            {state === 'error' && <CircleXIcon />}
            {state === 'done' && <FileTextIcon />}
        </AttachmentMedia>
    );
}

const getUploaderTitleLabel = (archivo?: Archivo, file?: File, fallbackLabel: string = 'Subir archivo') =>
    archivo
        ? getFileName(archivo)
        : file
            ? file.name
            : fallbackLabel;

const UploaderTitle = ({
    archivo,
    file,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentTitle>, 'children'> & {
    archivo?: Archivo;
    file?: File;
}) => (
    <AttachmentTitle
        children={getUploaderTitleLabel(archivo, file)}
        {...props}
    />
)

const getUploaderDescriptionLabel = (archivo?: Archivo, file?: File, fallbackLabel: string = 'Presiona aquí para adjuntar un archivo') =>
    archivo
        ? formatFileSize(archivo.size)
        : file
            ? formatFileSize(file.size)
            : fallbackLabel;

const UploaderDescription = ({
    archivo,
    fallbackLabel,
    file,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentDescription>, 'children'> & {
    archivo?: Archivo;
    file?: File;
    fallbackLabel?: string;
}) => (
    <AttachmentDescription
        children={getUploaderDescriptionLabel(archivo, file, fallbackLabel)}
        {...props}
    />
);

function UploaderActionRetrier({
    file,
    tooltipMessage = 'Reintentar',
    icon = <RotateCcwIcon />,
    mutate,
    ...props
}: Omit<React.ComponentProps<typeof TooltipAttachmentAction>, 'onClick'> & Pick<ReturnType<typeof useMutation>, 'mutate'> & {
    file: File;
}) {
    return (
        <TooltipAttachmentAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            onClick={() => mutate({ data: file })}
            {...props}
        />
    );
}

interface UploaderInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'accept' | 'className' | 'onChange'> {
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    mutateAsync: ReturnType<typeof useMutation>['mutateAsync'];
}
const UploaderInput = ({
    setFile,
    mutateAsync,
    ...props
}: UploaderInputProps) => (
    <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={async (e) => {
            const file = e.target.files?.[0];
            setFile(file);

            if (file) {
                await mutateAsync({ data: file });
            }
            e.target.value = '';
        }}
        {...props}
    />
);

const UploaderTrigger = ({
    inputRef,
    ...props
}: React.ComponentProps<typeof AttachmentTrigger> & {
    inputRef: React.RefObject<HTMLInputElement | null>
}) => (
    <AttachmentTrigger
        onClick={() => inputRef.current?.click()}
        {...props}
    />
);

export {
    type ArchivoSelectorType as ArchivoUploaderType,
    ArchivoSelector as ArchivoUploader,
    UploaderInput as ArchivoUploaderInput,
    UploaderTitle as ArchivoUploaderTitle,
    UploaderDescription as ArchivoUploaderDescription,
    AttachmentContent as ArchivoUploaderAttachmentContent,
    UploaderTrigger as ArchivoUploaderTrigger,
    AttachmentActions as ArchivoUploaderAttachmentActions,
    ArchivoSelectorAction as ArchivoUploaderAction,
    ArchivoSelectorActionViewer as ArchivoUploaderActionViewer,
    ArchivoSelectorActionSwitcher as ArchivoUploaderActionSwitcher,
    UploaderActionRetrier as ArchivoUploaderActionRetrier,
    UploaderMedia as ArchivoUploaderMedia,
    AttachmentGroup as ArchivoUploaderAttachmentGroup
}
