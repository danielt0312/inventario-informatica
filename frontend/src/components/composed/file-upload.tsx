import { cn, isPdfFile } from "@/lib/utils";
import * as Root from "../ui/file-upload";
import { Button } from "../ui/button";
import { EyeIcon, UploadIcon, XIcon } from "lucide-react";

export function FileUpload({
    value: files,
    className,
    ...props
}: Root.FileUploadProps) {
    return (
        <Root.FileUpload
            value={files}
            className={cn("w-full", className)}
            {...props}
        >
            <Root.FileUploadDropzone>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                        <UploadIcon className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Arrastra y suelta archivo(s) aquí</p>
                    <p className="text-muted-foreground text-xs">
                        O presiona para navegar
                    </p>
                </div>
            </Root.FileUploadDropzone>
            <Root.FileUploadList>
                {files?.map((file) => (
                    <Root.FileUploadItem key={file.name} value={file}>
                        <Root.FileUploadItemPreview />
                        <Root.FileUploadItemMetadata />

                        <div className="flex gap-1">
                            {isPdfFile(file) && (
                                <Button variant="ghost" size="icon" className="size-7" onClick={() => {
                                    const url = URL.createObjectURL(file);
                                    const newTab = window.open(url, '_blank');

                                    if (newTab) {
                                        newTab.addEventListener('load', () => URL.revokeObjectURL(url));
                                    }
                                }}>
                                    <EyeIcon />
                                </Button>
                            )}

                            <Root.FileUploadItemDelete asChild>
                                <Button variant="ghost" size="icon" className="size-7">
                                    <XIcon />
                                </Button>
                            </Root.FileUploadItemDelete>
                        </div>
                    </Root.FileUploadItem>
                ))}
            </Root.FileUploadList>
        </Root.FileUpload>
    );
}
