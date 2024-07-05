import {
	Route,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';
import { RootErrorBoundary } from '../layout/root-error-boundary';

export const anonymousRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<RootErrorBoundary />}>
			<Route path='*' element={null} />
		</Route>
	)
);
