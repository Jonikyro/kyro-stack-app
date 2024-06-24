import { TooltipProvider } from '@/components/tooltip/tooltip-provider';
import '@/styles/index.css'; // this is the main css file and should be imported first because of the css-layers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
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

function RootLoader() {
	return (
		<div aria-hidden='true' className='absolute inset-0'>
			<div className='flex h-full items-center justify-center'>
				<div className='cube'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<I18nProvider locale='fi'>
				<BrowserRouter>
					<TooltipProvider>
						<Suspense fallback={<RootLoader />}>
							<App />
						</Suspense>
					</TooltipProvider>
				</BrowserRouter>
			</I18nProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
