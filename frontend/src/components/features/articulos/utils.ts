import { ArticuloEstadoEnum } from "@/lib/constants";

const isEstadoRevision = (id: number) =>
    id === ArticuloEstadoEnum.REVISION;

export {
    isEstadoRevision as isArticuloEstadoRevision
}

