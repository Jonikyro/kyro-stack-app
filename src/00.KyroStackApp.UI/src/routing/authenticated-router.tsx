import { Layout } from '@/layout/layout';
import { RootErrorBoundary } from '@/layout/root-error-boundary';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';

export const authenticatedRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />} errorElement={<RootErrorBoundary />}>
			<Route index lazy={() => import('@/pages/home-page')} />
			<Route path='*' element={'404'} />
		</Route>
	)
);
