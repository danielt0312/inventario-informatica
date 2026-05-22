import { cn } from "@/lib/utils";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    type FileUploadProps
} from "../ui/file-upload";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";

export function FileUploader({
    value: files,
    className,
    ...props
}: FileUploadProps) {
    return (
        <FileUpload
            value={files}
            className={cn("w-full", className)}
            {...props}
        >
            <FileUploadDropzone>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Arrastra y suelta archivo(s) aquí</p>
                    <p className="text-muted-foreground text-xs">
                        O presiona para navegar
                    </p>
                </div>
            </FileUploadDropzone>
            <FileUploadList>
                {files?.map((file) => (
                    <FileUploadItem key={file.name} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                            <Button variant="ghost" size="icon" className="size-7">
                                <X />
                            </Button>
                        </FileUploadItemDelete>
                    </FileUploadItem>
                ))}
            </FileUploadList>
        </FileUpload>
    );
}
