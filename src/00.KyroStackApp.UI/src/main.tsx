import '@/styles/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { queryClient } from './data/query-client';
import { LocalizationProvider } from './localization/localization-provider';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<LocalizationProvider>
				<RouterProvider router={router} />
			</LocalizationProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
