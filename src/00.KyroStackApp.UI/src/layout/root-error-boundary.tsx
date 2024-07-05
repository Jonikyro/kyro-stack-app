import { useRouteError } from 'react-router-dom';

export function RootErrorBoundary() {
	const error = useRouteError();

	console.error(error);

	return (
		<div>
			<h1>Oh noes! Something went very very wrong...</h1>
		</div>
	);
}
