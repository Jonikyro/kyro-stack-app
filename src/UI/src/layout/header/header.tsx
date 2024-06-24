import { getRootScrollElement } from '@/utils/get-root-scroll-element';
import { useEventListener } from '@/utils/use-event-listener';
import { useCallback, useRef } from 'react';

const rootScrollElem = getRootScrollElement();
const MIN_SCROLL_DOWN = 100;

export function Header() {
	const isVisibleRef = useRef(true);
	const lastScrollRef = useRef(0);
	const headerRef = useRef<HTMLElement>(null);

	const onRootScroll = useCallback(() => {
		const scroll = rootScrollElem.scrollTop;

		if (
			isVisibleRef.current &&
			scroll > MIN_SCROLL_DOWN &&
			scroll !== lastScrollRef.current &&
			scroll > lastScrollRef.current
		) {
			isVisibleRef.current = false;
			headerRef.current?.classList.remove('visible');
		} else if (!isVisibleRef.current && scroll < lastScrollRef.current) {
			isVisibleRef.current = true;
			headerRef.current?.classList.add('visible');
		}

		lastScrollRef.current = scroll;
	}, []);

	// passive: true --> https://stackoverflow.com/a/37721906
	useEventListener('scroll', onRootScroll, document, { passive: true });

	return (
		<header id='page-header' ref={headerRef} className='visible z-10'>
			<h1>Header</h1>
		</header>
	);
}
