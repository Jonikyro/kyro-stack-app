import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';
import {
	// eslint-disable-next-line no-restricted-imports
	Link as ReactRouterLink,
	LinkProps as ReactRouterLinkProps
} from 'react-router-dom';

export type LinkProps = Omit<ReactRouterLinkProps, 'to'> & {
	href: string;
};

/**
 * Link component to navigate within the application.
 *
 * @see https://reactrouter.com/en/main/components/link
 *
 * @example Simple
 * <Link href='/'>Home</Link>
 */
export function Link({ className, children, href, ...rest }: LinkProps) {
	return (
		<ReactRouterLink
			{...rest}
			className={cn('', className)}
			data-component='link'
			to={href}
		>
			{children}
		</ReactRouterLink>
	);
}

export type ExternalLinkProps = ComponentPropsWithoutRef<'a'>;

/**
 * Link component to navigate to an external page. Opens the page in new tab by default.
 *
 * @example Simple
 * ```tsx
 * <ExternalLink href='www.google.com'>Google</ExternalLink>
 * ```
 *
 * @example Open the page in current tab
 * ```tsx
 * <ExternalLink href='www.google.com' target='_self'>Google</ExternalLink>
 * ```
 */
export function ExternalLink({
	children,
	className,
	target,
	rel,
	...rest
}: ExternalLinkProps) {
	return (
		<a
			data-component='external-link'
			className={cn('', className)}
			rel={rel ?? 'noopener noreferrer'}
			target={target ?? '_blank'}
			{...rest}
		>
			{children}
			add icon here
		</a>
	);
}
