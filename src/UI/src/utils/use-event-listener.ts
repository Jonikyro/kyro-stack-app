import { useEffect, useLayoutEffect, useRef } from 'react';

type CustomEventListenerOptions =
	| boolean
	| (AddEventListenerOptions & {
			delay?: number;
	  });

function useEventListener<K extends keyof WindowEventMap>(
	eventType: K,
	handler: (event: WindowEventMap[K]) => void,
	element: Window,
	options?: CustomEventListenerOptions
): void;

function useEventListener<K extends keyof DocumentEventMap>(
	eventType: K,
	handler: (event: DocumentEventMap[K]) => void,
	element: Document,
	options?: CustomEventListenerOptions
): void;

function useEventListener<
	K extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLDivElement
>(
	eventType: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element: Element,
	options?: CustomEventListenerOptions
): void;

function useEventListener(
	eventType: any,
	handler: any,
	element: any,
	options?: CustomEventListenerOptions
) {
	const handlerRef = useRef(handler);

	useLayoutEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		let id: ReturnType<typeof setTimeout> | undefined;
		const listener = (event: any) => handlerRef.current(event);

		if (!!options && typeof options === 'object' && options.delay) {
			id = setTimeout(() => {
				element.addEventListener(eventType, listener, options);
			}, options.delay);
		} else {
			element.addEventListener(eventType, listener, options);
		}

		return () => element.removeEventListener(eventType, listener, options);
	}, [eventType, element, options]);
}

export { useEventListener };
