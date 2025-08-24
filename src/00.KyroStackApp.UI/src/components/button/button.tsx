import { cn } from '@/utils/cn';
import { mergeRefs } from '@/utils/merge-refs';
import { VariantProps, cva } from 'class-variance-authority';
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	useRef
} from 'react';
import { useFocusable } from 'react-aria';
import './button.css';

const buttonVariance = cva(
	// Default styles
	'',
	{
		variants: {
			size: {
				small: ['min-h-8 py-1 px-2 rounded-sm text-sm'],
				default: ['min-h-10 py-2 px-4 rounded'],
				large: ['min-h-12 py-3 px-5 rounded-md text-lg']
			}
		},
		defaultVariants: {
			size: 'default'
		}
	}
);

export type ButtonProps = VariantProps<typeof buttonVariance> &
	ComponentPropsWithoutRef<'button'> & {
		variant?: 'primary' | 'secondary' | 'tertiary';
	};

/**
 * Button component
 *
 * @example
 * Basic
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
			aria-disabled={disabled}
			className={cn(buttonVariance({ size }), className)}
			ref={mergeRefs(buttonRef, ref)}
			type={disabled ? 'button' : type ?? 'button'}
			onClick={disabled ? undefined : onClick}
			{...rest}
			{...focusableProps}
		>
			{children}
		</button>
	);
});
