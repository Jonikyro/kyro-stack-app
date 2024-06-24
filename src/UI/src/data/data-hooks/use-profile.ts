import { apiClient } from '@/data/api-client';
import {
	queryOptions,
	useQuery,
	useSuspenseQuery
} from '@tanstack/react-query';

export type UserProfile = {
	firstname: string;
	lastname: string;
	role: 'admin' | 'user';
};

export async function getUserProfile() {
	const response = await apiClient.get('/user/profile');
	return await response.json<UserProfile>();
}

export const profileQuery = queryOptions({
	queryKey: ['user', 'profile'],
	queryFn: getUserProfile,
	staleTime: 1000 * 60 * 30 // 30 minutes
});

export function useProfile() {
	return useQuery(profileQuery);
}

export function useSuspenseProfile() {
	return useSuspenseQuery(profileQuery);
}
