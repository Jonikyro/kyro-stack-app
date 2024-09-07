import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export type VisuallyHiddenProps<T extends HtmlElementTagName> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Element visible only to screen readers.
 *
 * @example Simple
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
	const As = as ?? 'span';

	return (
		<As
			data-component='visually-hidden'
			className={clsx('sr-only', className)}
			{...rest}
		>
			{children}
		</As>
	);
}
