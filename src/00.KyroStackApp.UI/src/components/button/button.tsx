import { mergeRefs } from '@/utils/merge-refs';
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	useRef
} from 'react';
import { useFocusable } from 'react-aria';
import './button.css';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
	variant?: 'primary' | 'secondary' | 'tertiary';
	size?: 'small' | 'default' | 'large';
};

/**
 * Button component
 *
 * @example
 * Basic usage
 * <Button>Hello</Button>
 *
 * @example
 * Styled button
 * <Button color='primary' size='small'>Hello</Button>
 *
 * @example
 * With `ref` prop
 * const buttonRef = useRef<ElementRef<'button'>>(null);
 * return <Button ref={buttonRef}>Hello</Button>
 */
export const Button = forwardRef(function Button(
	{
		children,
		className,
		disabled,
		onClick,
		size,
		type,
		variant,
		onFocus,
		onBlur,

		...rest
	}: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>
) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	// This is required for <Button> to work with <Tooltip.Trigger>
	const { focusableProps } = useFocusable(rest, buttonRef);

	return (
		<button
			data-component='button'
			data-variant={variant}
			data-size={size}
			aria-disabled={disabled}
			className={className}
			ref={mergeRefs(buttonRef, ref)}
			type={disabled ? 'button' : (type ?? 'button')}
			onClick={disabled ? undefined : onClick}
			onFocus={onFocus}
			onBlur={onBlur}
			{...rest}
			{...focusableProps}
		>
			{children}
		</button>
	);
});
