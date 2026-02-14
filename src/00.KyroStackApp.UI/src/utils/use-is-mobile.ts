import { useLayoutEffect, useState } from 'react';
import { isMobileScreenQuery } from './media-queries';

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(() => {
		const mediaQuery = window.matchMedia(isMobileScreenQuery);
		return mediaQuery.matches;
	});

	useLayoutEffect(() => {
		const mediaQuery = window.matchMedia(isMobileScreenQuery);

		const handleChange = ({ matches }: MediaQueryListEvent) => {
			setIsMobile(matches);
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return isMobile;
}
