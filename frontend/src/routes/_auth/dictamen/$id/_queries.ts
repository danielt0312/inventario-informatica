import { queryOptions } from '@tanstack/react-query'

export const userQueryOptions = (userId: string) =>
    queryOptions({
        queryKey: ['user', userId],
        queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
    })
