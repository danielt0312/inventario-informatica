import { QueryClient } from "@tanstack/react-query";
import { Attachment, AttachmentActionSeeDocument, AttachmentActionSelector } from "./attachment";
import type { Archivo } from "@/types/documentos";
import React from "react";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import type { TResponse } from "@/types/generics";
import { Attachment, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "../ui/attachment";
import { formatFileSize } from "@/lib/utils";
import { CircleXIcon, FileTextIcon, RotateCcwIcon, UploadIcon } from "lucide-react";
import { TooltipAttachmentAction } from "./tooltip-attachment-action";
import { Spinner } from "../ui/spinner";

type MutationResponse = TResponse<Archivo>;
type MutationPayload = File;
type MutationOptions = Omit<FormMutation<MutationResponse, MutationPayload>, 'url' | 'toFormData'>;

export const useUploadFileMutation = (
    options: MutationOptions,
    queryClient?: QueryClient,
) => useFormMutation<MutationResponse, MutationPayload>({
    url: 'archivos',
    toFormData: (file) => {
        const formData = new FormData;
        formData.append('archivo', file);
        return formData;
    },
    ...options
}, queryClient);

interface AttachmentFileSelectorProps extends Omit<React.ComponentProps<typeof Attachment>, 'state'> {
    mutation?: {
        options?: MutationOptions;
        queryClient?: QueryClient;
    }
}

export type AttachmentFileSelector = Attachment;

export function AttachmentFileSelector({
    archivoValue,
    value,
    disabled,
    mutation,
    onSelector,
    ...props
}: AttachmentFileSelectorProps) {
    const [archivo, setArchivo] = React.useState(archivoValue);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);

    const { mutateAsync, mutate, status } = useUploadFileMutation({
        ...mutation?.options,
        onSuccess: (data, variables, onMutateResult, context) => {
            const archivo = data.data.data;
            setArchivo(archivo);
            mutation?.options?.onSuccess?.(data, variables, onMutateResult, context);
        },
    }, mutation?.queryClient);

    const hasArchivo = archivo !== undefined;
    const hasFile = file !== undefined;
    const hasValue = value !== undefined;

    return (
        <Attachment
            state={status === 'pending'
                ? 'processing'
                : status === 'success'
                    ? 'done'
                    : status}
            {...props}
        >
            <AttachmentMedia>
                {status === 'idle' && <UploadIcon />}
                {status === 'pending' && <Spinner />}
                {status === 'error' && <CircleXIcon />}
                {status === 'success' && <FileTextIcon /> }
            </AttachmentMedia>

            <AttachmentContent>
                <AttachmentTitle>
                    {hasArchivo
                        ? `${archivo.nombre}.${archivo.extension}`
                        : hasFile
                            ? file.name
                            : 'Subir archivo'}
                </AttachmentTitle>
                <AttachmentDescription>
                    {hasArchivo
                        ? formatFileSize(archivo.size)
                        : hasFile
                            ? formatFileSize(file.size)
                            : 'Presiona aquí para seleccionar un archivo'}
                </AttachmentDescription>
                <input
                    ref={inputRef}
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
                />
            </AttachmentContent>

            {hasValue && <AttachmentTrigger onClick={() => inputRef.current?.click()} disabled={disabled} aria-disabled={disabled} />}

            <AttachmentActions>
                {status === 'error' && file && (
                    <AttachmentFileSelectorActionRetryUpload
                        file={file}
                        mutate={mutate}
                    />
                )}

                {hasArchivo && (
                    <>
                        <AttachmentActionSeeDocument archivo={archivo} />
                        <AttachmentActionSelector onClick={onSelector} />
                    </>
                )}
            </AttachmentActions>
        </Attachment >
    );
}

export function AttachmentFileSelectorActionRetryUpload({
    file,
    tooltipMessage = 'Reintentar',
    icon = <RotateCcwIcon />,
    mutate,
    ...props
}: Omit<React.ComponentProps<typeof TooltipAttachmentAction>, 'onClick'> & Pick<ReturnType<typeof useUploadFileMutation>, 'mutate'> & {
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
