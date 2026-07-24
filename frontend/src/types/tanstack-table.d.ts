import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        previewFile?: (uuid: string, title: string) => void;
        isPreviewing?: boolean;
    }
}
