import React from "react";
import { Card } from "@/components/ui/card";
import { DictamenEstadoEnum } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

export const OrderDictamenEstado = [
    undefined,
    DictamenEstadoEnum.DICTAMINAR,
    DictamenEstadoEnum.EVIDENCIAR,
    DictamenEstadoEnum.SURTIR,
    DictamenEstadoEnum.INVENTARIAR,
] as const satisfies Partial<Record<number, DictamenEstadoEnum>>;
export type OrderDictamenEstado = (typeof OrderDictamenEstado)[number];

export function getTitle(step?: OrderDictamenEstado) {
    switch (step) {
        case DictamenEstadoEnum.DICTAMINAR: return 'Dictaminar Requisición';
        case DictamenEstadoEnum.EVIDENCIAR: return 'Adjuntar evidencia de requisición';
        case DictamenEstadoEnum.SURTIR: return 'Facturar Preinventario';
        case DictamenEstadoEnum.INVENTARIAR: return 'Inventariar y Resguardar';
        default: return 'Creación de Dictamen';
    }
}

const stepVariants = cva(
    "flex flex-row gap-4 font-bold items-center py-5 px-3",
    {
        variants: {
            variant: {
                default: "[&_[data-slot='icon']]:bg-sand [&_[data-slot='title']]:text-sand",
                ongoing: "[&_[data-slot='icon']]:bg-yellow-500 [&_[data-slot='title']]:text-yellow-500 bg-stone-700",
                accomplished: "[&_[data-slot='icon']]:bg-green-500 [&_[data-slot='title']]:text-green-500"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

export type TStep = {
    step: OrderDictamenEstado;
};

export function Step({
    variant = "default",
    step,
    icon
}: VariantProps<typeof stepVariants> & TStep & {
    icon: React.ReactNode;
}) {
    return (
        <div className={cn(stepVariants({ variant }))}>
            <div className="flex justify-center items-center size-8 rounded-full text-lg" data-slot="icon">
                {icon}
            </div>
            <div className="flex-1" data-slot="title">
                {getTitle(step)}
            </div>
        </div>
    );
}

export function Steps({
    step
}: TStep) {
    const currentIndex = OrderDictamenEstado.indexOf(step);

    return (
        <>
            {OrderDictamenEstado.map((value, index) => {
                const isPast = index < currentIndex;
                const isCurrent = value === step;

                return (
                    <Step
                        key={index}
                        step={value}
                        icon={isPast ? <Check /> : index + 1}
                        variant={
                            isCurrent
                                ? "ongoing"
                                : isPast
                                    ? "accomplished"
                                    : "default"
                        }
                    />
                );
            })}
        </>
    )
}

export function SidebarSteps({
    step,
    children
}: {
    step?: TStep['step'];
    children: React.ReactNode
}) {
    return (
        <Card className="flex flex-row gap-0 p-0">
            <div className="max-w-1/7 bg-stone-900 rounded-l-xl">
                <div className="sticky top-0 py-10">
                    <Steps step={step} />
                </div>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-6">
                {children}
            </div>
        </Card>
    );
}
