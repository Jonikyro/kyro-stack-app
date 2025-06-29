import { ComponentPropsWithoutRef } from 'react';

export type ExtLinkProps = ComponentPropsWithoutRef<'a'>;

/**
 * Link component to navigate to an external page. Opens the page in new tab by default.
 *
 * @example Simple
 * ```tsx
 * <ExtLink href='www.google.com'>Google</ExtLink>
 * ```
 *
 * @example Open the page in current tab
 * ```tsx
 * <ExtLink href='www.google.com' target='_self'>Google</ExtLink>
 * ```
 */
export function ExtLink({
	children,
	className,
	target,
	rel,
	...rest
}: ExtLinkProps) {
	return (
		<a
			data-component='external-link'
			className={className}
			rel={rel ?? 'noopener noreferrer'}
			target={target ?? '_blank'}
			{...rest}
		>
			{children}
			add icon here
		</a>
	);
}
