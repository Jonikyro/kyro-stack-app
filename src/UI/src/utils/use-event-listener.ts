import { useEffect, useLayoutEffect, useRef } from 'react';

function useEventListener<K extends keyof WindowEventMap>(
	eventType: K,
	handler: (event: WindowEventMap[K]) => void,
	element: Window,
	options?: boolean | AddEventListenerOptions
): void;

function useEventListener<K extends keyof DocumentEventMap>(
	eventType: K,
	handler: (event: DocumentEventMap[K]) => void,
	element: Document,
	options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
	K extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLDivElement
>(
	eventType: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element: Element,
	options?: boolean | AddEventListenerOptions
): void;

function useEventListener(
	eventType: any,
	handler: any,
	element: any,
	options: any
) {
	const handlerRef = useRef(handler);

	useLayoutEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const listener = (event: any) => handlerRef.current(event);

		element.addEventListener(eventType, listener, options);

		return () => element.removeEventListener(eventType, listener, options);
	}, [eventType, element, options]);
}

export { useEventListener };
