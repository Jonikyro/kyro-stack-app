import '@/styles/index.css'; // this is the main css file and should be imported first because of the css-layers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { I18nProvider } from 'react-aria';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<I18nProvider locale='fi'>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</I18nProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
