import { ArchivoSelector, ArchivoSelectorAction, ArchivoSelectorActionViewer, type ArchivoSelectorType, ArchivoSelectorActionSwitcher } from "@/components/features/archivos/selector";
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentActions, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@/components/ui/attachment";
import { Spinner } from "@/components/ui/spinner";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import type { Archivo } from "@/types/documentos";
import type { LaravelValidationErrors, TResponse } from "@/types/generics";
import { CircleXIcon, FileTextIcon, RotateCcwIcon, UploadIcon } from "lucide-react";
import React from "react";
import { getFileName as getFileNameFromArchivo } from "./utils";
import { TooltipAttachmentAction } from "@/components/ui/tooltip-attachment-action";
import { formatFileSize } from "@/lib/utils";
import type { MutationStatus, QueryClient } from "@tanstack/react-query";

const getFileName = (value?: Archivo | File | undefined) =>
    value instanceof File
        ? value.name
        : value !== undefined
            ? getFileNameFromArchivo(value)
            : undefined;

const getFileSize = (value?: Archivo | File | undefined) =>
    value instanceof File
        ? formatFileSize(value.size)
        : value !== undefined
            ? formatFileSize(value.size)
            : undefined;

const Uploader = ArchivoSelector;
const UploaderContent = AttachmentContent;
const UploaderActions = AttachmentActions;
const UploaderAction = ArchivoSelectorAction;
const UploaderActionViewer = ArchivoSelectorActionViewer;
const UploaderGroup = AttachmentGroup;

type UseMutationOptions = Omit<FormMutation<TResponse<Archivo>, File, LaravelValidationErrors>, 'url' | 'toFormData'>;

const useMutation = (options?: UseMutationOptions, queryClient?: QueryClient) => useFormMutation<TResponse<Archivo>, File>({
    url: 'api/archivos',
    toFormData: (file) => {
        const formData = new FormData;
        formData.append('archivo', file);
        return formData;
    },
    ...options
}, queryClient);

type UploaderProps = React.ComponentProps<typeof Uploader>;
type UploaderState = NonNullable<UploaderProps['state']>;
const getState = (status: MutationStatus): UploaderState => {
    if (status === 'pending') return 'uploading';
    if (status === 'success') return 'done';
    return status;
}

function UploaderLayout({
    value,
    triggererDisabled,
    mutation,
    ...props
}: Omit<React.ComponentProps<typeof Uploader>, 'children' | 'state'> & {
    onSelectorClick?: () => void;
    triggererDisabled?: boolean;
    mutation?: {
        options?: UseMutationOptions;
        queryClient?: QueryClient;
    }
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);
    const [archivo, setArchivo] = React.useState(value);

    const { mutate, mutateAsync, status } = useMutation({
        onSuccess: (data, variables, onMutateResult, context) => {
            const archivo = data.data.data;
            setArchivo(archivo);
            mutation?.options?.onSuccess?.(data, variables, onMutateResult, context);
        },
        ...mutation?.options
    }, mutation?.queryClient);

    const state = getState(status);

    return (
        <Uploader
            value={value}
            state={state}
            {...props}
        >
            <UploaderInput ref={inputRef} mutateAsync={mutateAsync} onFileChange={setFile} />
            <UploaderMedia state={state} />
            <UploaderContent>
                <UploaderTitle
                    state={state}
                    labelState={{
                        done: getFileName(file ?? archivo)
                    }}
                />
                <UploaderDescription archivo={value} />
            </UploaderContent>
            <UploaderActions>
                {state === 'error' && file && <UploaderActionRetrier file={file} mutate={mutate} />}
                {archivo && <UploaderActionViewer archivo={archivo} />}
                {file && <UploaderActionSwitcher inputRef={inputRef} />}
            </UploaderActions>
            {!triggererDisabled && <UploaderTrigger inputRef={inputRef} />}
        </Uploader>
    );
}

type SetState<T> = Record<UploaderState, T>;
type IconState = SetState<React.ReactNode>;
const defaultIconState: IconState = {
    idle: <UploadIcon />,
    uploading: <Spinner />,
    processing: <Spinner />,
    error: <CircleXIcon />,
    done: <FileTextIcon />
}

function UploaderMedia({
    iconState,
    state = 'idle',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentMedia>, 'children' | 'icon'> & {
    state?: React.ComponentProps<typeof Attachment>['state'];
    iconState?: IconState;
}) {
    const icons = {  }

    return (
        <AttachmentMedia variant="icon" {...props}>
            {state === 'idle' && <UploadIcon />}
            {(state === 'uploading' || state === 'processing') && <Spinner />}
            {state === 'error' && <CircleXIcon />}
            {state === 'done' && <FileTextIcon />}
        </AttachmentMedia>
    );
}

type LabelState = Partial<Record<UploaderState, string>>;

const defaultLabelState: Record<UploaderState, string> = {
    idle: 'Subir archivo',
    uploading: 'Subiendo archivo...',
    processing: 'Procesando...',
    error: 'Ocurrió un error al subir el archivo',
    done: 'Archivo subido correctamente',
} as const;

function UploaderTitle({
    labelState,
    state = 'idle',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentTitle>, 'children'> & {
    state?: UploaderState;
    file?: File;
    labelState?: LabelState;
}) {
    const labels = { ...defaultLabelState, ...labelState };

    return (
        <AttachmentTitle {...props}>
            {labels[state]}
        </AttachmentTitle>
    );
}

function UploaderDescription({
    archivo,
    fallbackLabel,
    file,
    ...props
}: Omit<React.ComponentProps<typeof AttachmentDescription>, 'children'> & {
    state?: UploaderState;
    archivo?: Archivo;
    file?: File;
    fallbackLabel?: string;
}) {
    return (
        <AttachmentDescription {...props}>
            {getFileSize(archivo ?? file)}
        </AttachmentDescription>
    );
}

function UploaderActionRetrier({
    file,
    mutate,
    tooltipMessage = 'Reintentar',
    icon = <RotateCcwIcon />,
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

function UploaderActionSwitcher({
    inputRef,
    ...props
}: Omit<React.ComponentProps<typeof ArchivoSelectorActionSwitcher>, 'onClick'> & {
    inputRef: React.RefObject<HTMLInputElement | null>
}) {
    return (
        <ArchivoSelectorActionSwitcher
            onClick={() => inputRef.current?.click()}
            {...props}
        />
    );
}

interface UploaderInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'accept' | 'className' | 'onChange'> {
    mutateAsync: ReturnType<typeof useMutation>['mutateAsync'];
    onFileChange: (file: File | undefined) => void;
}

function UploaderInput({
    onFileChange,
    mutateAsync,
    ...props
}: UploaderInputProps) {
    return (
        <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={async (e) => {
                const file = e.target.files?.[0];
                onFileChange(file);

                if (file) {
                    await mutateAsync({ data: file });
                }
                e.target.value = '';
            }}
            {...props}
        />
    );
}

function UploaderTrigger({
    inputRef,
    ...props
}: React.ComponentProps<typeof AttachmentTrigger> & {
    inputRef: React.RefObject<HTMLInputElement | null>
}) {
    return (
        <AttachmentTrigger
            onClick={() => inputRef.current?.click()}
            {...props}
        />
    );
}

export {
    type ArchivoSelectorType as ArchivoUploaderType,
    Uploader as ArchivoUploader,
    UploaderLayout as ArchivoUploaderLayout,
    UploaderInput as ArchivoUploaderInput,
    UploaderTitle as ArchivoUploaderTitle,
    UploaderDescription as ArchivoUploaderDescription,
    UploaderTrigger as ArchivoUploaderTrigger,
    UploaderAction as ArchivoUploaderAction,
    UploaderActionViewer as ArchivoUploaderActionViewer,
    UploaderActionSwitcher as ArchivoUploaderActionSwitcher,
    UploaderActionRetrier as ArchivoUploaderActionRetrier,
    UploaderMedia as ArchivoUploaderMedia,
    UploaderGroup as ArchivoUploaderAttachmentGroup,
    UploaderContent as ArchivoUploaderAttachmentContent,
    UploaderActions as ArchivoUploaderAttachmentActions,
}
