import { prefersReducedMotionQuery } from '@/utils/media-queries';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const userPrefersReducedMotion = window.matchMedia(
	prefersReducedMotionQuery
).matches;

export function ScrollToHash() {
	const location = useLocation();
	const lastHash = useRef('');

	// Listen to changes in `location.hash` and scroll to element if it exists.
	// https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
	useEffect(() => {
		if (location.hash) {
			lastHash.current = location.hash.slice(1);
		}

		let hashElement: HTMLElement | null;

		if (
			lastHash.current &&
			(hashElement = document.getElementById(lastHash.current))
		) {
			setTimeout(() => {
				hashElement?.scrollIntoView({
					behavior: userPrefersReducedMotion ? 'instant' : 'smooth',
					block: 'start'
				});

				lastHash.current = '';
			}, 100);
		}
	}, [location.hash]);

	return null;
}
