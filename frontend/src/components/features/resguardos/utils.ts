import { ResguardoEstadoEnum } from "@/lib/constants"

const esEstadoCancelado = (estado: number) =>
    estado === ResguardoEstadoEnum.CANCELADO;

const esEstadoPendienteAcuse = (estado: number) =>
    estado === ResguardoEstadoEnum.PENDIENTE_ACUSE;

export {
    esEstadoCancelado as esResguardoEstadoCancelado,
    esEstadoPendienteAcuse as esResguardoEstadoPendienteAcuse
}
