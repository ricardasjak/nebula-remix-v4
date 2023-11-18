import { useRouteLoaderData } from '@remix-run/react';

export const useUserId = () => {
	// @ts-ignore
	const { userId } = useRouteLoaderData("root");
	return userId;
}
