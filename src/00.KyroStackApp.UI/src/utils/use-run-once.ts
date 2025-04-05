import { useEffect, useLayoutEffect, useRef } from 'react';

export function useRunOnceEffect(fn: () => unknown) {
	const runRef = useRef(false);

	useEffect(() => {
		if (!runRef.current) {
			runRef.current = true;
			fn();
		}
	}, [fn]);
}

export function useRunOnceLayoutEffect(fn: () => unknown) {
	const runRef = useRef(false);

	useLayoutEffect(() => {
		if (!runRef.current) {
			runRef.current = true;
			fn();
		}
	}, [fn]);
}
