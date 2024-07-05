import {
	ComponentPropsWithoutRef,
	ElementRef,
	ForwardedRef,
	forwardRef
} from 'react';

// Add text variants based on your different font types
// See: 'src/styles/design-system.css'
export type TextVariant =
	| 'heading'
	| 'subheading'
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
 * Generic `Text` component to
 *
 * @example Simple
 * ```tsx
 * // By default I am a `<span>`
 * <Text>
 * 	Hello Word!
 * </Text>
 * ```
 *
 * @example With `variant` prop
 * ```tsx
 * <Text variant='subheading'>
 * 	I am a subheading
 * </Text>
 * ```
 *
 * @example With `as` prop
 * ```tsx
 * <Text as='a' href='/'>
 *	Home
 * </Text>
 * ```
 *
 * @example With `ref` prop
 * ```tsx
 * const h1Ref = useRef<ElementRef<'h1'>>(null);
 * return <Text variant='heading' as='h1' ref={h1Ref} />
 * ```
 */
export const Text = forwardRef(TextBase);
