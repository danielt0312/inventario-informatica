import type { ArticuloEstado } from "@/types/articulos";
import { Badge } from "@/components/ui/badge";
import { ArticuloEstadoEnum } from "@/lib/constants";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = cva(
    undefined,
    {
        variants: {
            variant: {
                [ArticuloEstadoEnum.Activo]: "text-black bg-lime-400",
                [ArticuloEstadoEnum.Baja]: "text-black bg-red-400",
                [ArticuloEstadoEnum.BajaPreventiva]: "text-black bg-red-400/80",
            }
        },
    }
);

const Comp = ({
    estado,
    className,
    ...props
}: React.ComponentProps<typeof Badge> & {
    estado: ArticuloEstado
}) => (
    <Badge
        {...props}
        className={cn(
            variants({ variant: estado.id }),
            className
        )}
    >
        {estado.nombre}
    </Badge>
);

export {
    Comp as ArticuloEstadoBadge,
    variants as articuloEstadoVariants,
}
