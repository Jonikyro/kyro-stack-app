import { prefersReducedMotion } from '@/utils/media-queries';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const scrollBehavior = prefersReducedMotion ? 'instant' : 'smooth';

export function ScrollToHash() {
	const location = useLocation();
	const lastHash = useRef('');

	// listen to location change using useEffect with location as dependency
	// https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
	useEffect(() => {
		if (location.hash) {
			lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
		}

		if (lastHash.current && document.getElementById(lastHash.current)) {
			setTimeout(() => {
				document
					.getElementById(lastHash.current)
					?.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
				lastHash.current = '';
			}, 100);
		}
	}, [location]);

	return null;
}
