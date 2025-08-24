import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

const DEFAULT_ELEMENT = 'span';

export type VisuallyHiddenProps<T extends HtmlElementTagName> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Element visible only to screen readers.
 *
 * @example Basic
 * ```tsx
 * // By default I am a `<span>`
 * <VisuallyHidden>
 *    Hello word!
 * </VisuallyHidden>
 * ```
 *
 * @example With as prop
 * ```tsx
 * <VisuallyHidden as='div' className='inline' aria-atomic>
 *    Hello word!
 * </VisuallyHidden>
 * ```
 */
export function VisuallyHidden<T extends HtmlElementTagName = 'span'>({
	as,
	children,
	className,
	...rest
}: VisuallyHiddenProps<T>) {
	const As = as ?? DEFAULT_ELEMENT;

	return (
		<As
			className={clsx('sr-only', className)}
			data-component='visually-hidden'
			{...rest}
		>
			{children}
		</As>
	);
}
