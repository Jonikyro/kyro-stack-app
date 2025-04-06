import {
	ComponentPropsWithoutRef,
	ElementRef,
	ForwardedRef,
	forwardRef
} from 'react';
import './t.css';

// Add text variants based on your different font types.
// See: 'src/styles/design-system.css'

export type TextVariant = 'heading' | 'sub-heading' | 'normal' | 'small';

export type TextProps<T extends HtmlElementTagName> = {
	as?: T;
	variant?: TextVariant;
} & ComponentPropsWithoutRef<T>;

/**
 * Generic Text `T` component to.
 *
 * @example
 * ```tsx
 * // By default I am a `<span>`
 * <T>
 * 	 Hello Word!
 * </T>
 * ```
 *
 * @example
 * ```tsx
 * //  With `variant` and `as` props
 * <T variant='heading' as='h1'>
 * 	 Hello world!
 * </T>
 * ```
 *
 * @example
 * ```tsx
 * // With `ref` prop
 * const h1Ref = useRef<ElementRef<'h1'>>(null);
 * return <T variant='heading' as='h1' ref={h1Ref} />
 * ```
 */
export const T = forwardRef(function T<T extends HtmlElementTagName = 'span'>(
	{ as, children, variant = 'normal', ...rest }: TextProps<T>,
	forwardedRef: ForwardedRef<ElementRef<T>>
) {
	const As = as ?? 'span';

	return (
		<As
			data-component='t'
			data-variant={variant}
			ref={forwardedRef as null}
			{...rest}
		>
			{children}
		</As>
	);
});
