import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { anonymousRouter } from './anonymous-router';
import { authenticatedRouter } from './authenticated-router';

export function RootRouter() {
	const [userIsAuthenticated] = useState(true);

	if (!userIsAuthenticated) {
		return <RouterProvider router={anonymousRouter} />;
	}

	return <RouterProvider router={authenticatedRouter} />;
}
