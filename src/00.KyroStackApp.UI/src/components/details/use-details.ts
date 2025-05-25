import { useMemo, useRef } from 'react';
import { DetailsRef } from './details';

/**
 * Control the <Details> components open/closed state.
 *
 * @example
 * ```tsx
 * const [detailsRef, open, close, toggle] = useDetails();
 *
 * return (
 * 		<Details ref={detailsRef}>
 * 			<Summary>summary</Summary>
 * 			<div>content</div>
 * 		</Details>
 * );
 * ```
 */
export function useDetails() {
	const detailsRef = useRef<DetailsRef>(null);

	return useMemo(
		() =>
			[
				detailsRef,
				() => {
					detailsRef.current?.open();
				},
				() => {
					detailsRef.current?.close();
				},
				() => {
					detailsRef.current?.toggle();
				}
			] as const,
		[]
	);
}
