import '@/styles/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { queryClient } from './data/query-client';
import { LocalizationProvider } from './localization/localization-provider';
import { RootRouter } from './routing/root-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<LocalizationProvider>
				<RootRouter />
			</LocalizationProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
