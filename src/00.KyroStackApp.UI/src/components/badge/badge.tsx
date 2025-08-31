import { ComponentPropsWithoutRef } from 'react';

import './badge.css';

export type BadgeColor =
	| 'default'
	| 'red'
	| 'yellow'
	| 'green'
	| 'blue'
	| 'violet';

export type BadgeProps<T extends HtmlElementTagName = 'span'> = {
	as?: T;
	color?: BadgeColor;
} & ComponentPropsWithoutRef<T>;

/**
 * Badge component for displaying status or information.
 *
 * @example
 * Basic usage
 * ```tsx
 * <Badge color='red'>Error</Badge>
 * ```
 *
 * @example
 * With `as` prop
 * ```tsx
 * <Badge as='a' href='#' color='green'>Success</Badge>
 * ```
 */
export function Badge<T extends HtmlElementTagName = 'span'>({
	as,
	children,
	color,
	...rest
}: BadgeProps<T>) {
	const As = as || 'span';

	return (
		<As data-component='badge' data-color={color ?? 'default'} {...rest}>
			{children}
		</As>
	);
}
