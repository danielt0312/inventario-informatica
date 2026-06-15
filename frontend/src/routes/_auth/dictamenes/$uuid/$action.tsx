import api from '@/lib/axios';
import { DictamenEstadoEnum } from '@/lib/constants';
import { View } from '@/views/dictamenes/actions/view';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import type { Dictamen, DictamenEstado } from '@/views/dictamenes/partials/types';
import type { TResponse } from '@/types/generics';

export const Actions = ['dictaminar', 'evidenciar', 'facturar', 'inventariar'] as const;
export type Actions = (typeof Actions)[number];

export const StateAction = {
    [DictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [DictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [DictamenEstadoEnum.SURTIR]: 'facturar',
    [DictamenEstadoEnum.INVENTARIAR]: 'inventariar',
} as const satisfies Partial<Record<DictamenEstadoEnum, Actions>>;

export type ActionDictamenEstadoEnum = keyof typeof StateAction;

export function isValidState(value: DictamenEstadoEnum): value is ActionDictamenEstadoEnum {
    return value in StateAction;
}

export type ValidatedDictamen = Omit<Dictamen, 'estado'> & {
    estado: Omit<DictamenEstado, 'id'> & {
        id: ActionDictamenEstadoEnum;
    };
};

export const Route = createFileRoute('/_auth/dictamenes/$uuid/$action')({
    params: {
        parse: (rawParams) => ({
            uuid: z.string().parse(rawParams.uuid),
            action: z.enum(Actions).parse(rawParams.action),
        }),
    },
    component: View,
    beforeLoad: async ({ context, params }) => {
        const data = await context.queryClient.fetchQuery({
            queryKey: ['dictamenes', params.uuid],
            queryFn: () => api.get<TResponse<Dictamen>>(`api/dictamenes/${params.uuid}`)
                .then(r => r.data.data)
        });

        switch (data.estado.id) {
            case DictamenEstadoEnum.SURTIDO:
            case DictamenEstadoEnum.SURTIDO_PARCIAL:
                throw redirect({
                    to: IndexRoute.to
                });
            default:
                break;
        }

        if (StateAction[data.estado.id] != params.action) {
            throw redirect({
                to: Route.to,
                params: {
                    uuid: data.uuid,
                    action: StateAction[data.estado.id]
                }
            })
        }

        return { dictamen: data as ValidatedDictamen };
    }
});
