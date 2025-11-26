import type { GetPaths, PostPaths } from './schema';
import { fetcher } from 'utils-fetcher';

export const rgsFetcher = {
	post: async function post<
		T extends keyof PostPaths,
		TResponse = PostPaths[T]['post']['responses'][200]['content']['application/json'],
	>(options: {
		url: T;
		rgsUrl: string;
		variables?: PostPaths[T]['post']['requestBody']['content']['application/json'];
	}): Promise<TResponse> {
		const response = await fetcher({
			method: 'POST',
			variables: options.variables,
			endpoint: `https://${options.rgsUrl}${options.url}`,
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},

	get: async function get<
		T extends keyof GetPaths,
		TResponse = GetPaths[T]['get']['responses'][200],
	>(options: { url: T; rgsUrl: string; params: GetPaths[T]['get']["urlParams"] }): Promise<TResponse> {
		const response = await fetcher({
			method: 'GET',
			endpoint: `https://${options.rgsUrl}${options.url}`,
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
};