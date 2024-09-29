import { useEffect, useRef } from 'react';

export function useRunOnce(fn: () => unknown) {
	const runRef = useRef(false);

	useEffect(() => {
		if (!runRef.current) {
			runRef.current = true;
			fn();
		}
	}, [fn]);
}
