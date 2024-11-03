import { useEffect, useRef, useState } from 'react';
import { isMobileScreenQuery } from './media-queries';

export function useIsMobile() {
	const mediaQueryRef = useRef<MediaQueryList | null>(null);
	const [isMobile, setIsMobile] = useState(() => {
		const mediaQuery = window.matchMedia(isMobileScreenQuery);
		mediaQueryRef.current = mediaQuery;

		return mediaQuery.matches;
	});

	useEffect(() => {
		const handleChange = ({ matches }: MediaQueryListEvent) => {
			setIsMobile(matches);
		};

		mediaQueryRef.current?.addEventListener('change', handleChange);

		return () => {
			mediaQueryRef.current?.removeEventListener('change', handleChange);
		};
	}, []);

	return isMobile;
}
