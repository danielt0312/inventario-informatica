import { ResguardoEstadoEnum } from "@/lib/constants"

const esEstadoCancelado = (estado: number) =>
    estado === ResguardoEstadoEnum.CANCELADO;

export {
    esEstadoCancelado as esResguardoEstadoCancelado
}
