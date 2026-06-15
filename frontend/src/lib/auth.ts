import type { User } from '@/types/auth';
import type { TResponse } from '@/types/generics';
import { QueryClient, queryOptions } from '@tanstack/react-query';
import api from './axios';

export function userQueryOptions() {
    return queryOptions({
        queryKey: ['user'],
        queryFn: () => api.get<TResponse<User>>('api/user')
    });
}

export async function checkAuth(queryClient: QueryClient): Promise<User | null> {
    try {
        const response = await queryClient.fetchQuery(userQueryOptions());
        return response.data.data ?? null;
    } catch {
        return null;
    }
}
