import {
	ComponentPropsWithoutRef,
	ElementRef,
	ForwardedRef,
	forwardRef
} from 'react';

// Add text variants based on your different font types.
// See: 'src/styles/design-system.css'
export type TextVariant =
	| 'heading'
	| 'sub-heading'
	| 'regular'
	| 'small'
	| 'quote';

export type TextProps<T extends HtmlElementTagName> = {
	as?: T;
	variant?: TextVariant;
} & ComponentPropsWithoutRef<T>;

function TextBase<T extends HtmlElementTagName = 'span'>(
	{ as, children, variant = 'regular', ...rest }: TextProps<T>,
	forwardedRef: ForwardedRef<ElementRef<T>>
) {
	const As = as ?? 'span';

	return (
		<As
			data-component='text'
			data-text-variant={variant}
			ref={forwardedRef as null}
			{...rest}
		>
			{children}
		</As>
	);
}

/**
 * Generic Text `T` component to
 *
 * @example Simple
 * ```tsx
 * // By default I am a `<span>`
 * <T>
 * 	Hello Word!
 * </T>
 * ```
 *
 * @example With `variant` prop
 * ```tsx
 * <T variant='subheading'>
 * 	I am a subheading
 * </T>
 * ```
 *
 * @example With `as` prop
 * ```tsx
 * <T as='a' href='/'>
 *	Home
 * </T>
 * ```
 *
 * @example With `ref` prop
 * ```tsx
 * const h1Ref = useRef<ElementRef<'h1'>>(null);
 * return <T variant='heading' as='h1' ref={h1Ref} />
 * ```
 */
export const T = forwardRef(TextBase);
