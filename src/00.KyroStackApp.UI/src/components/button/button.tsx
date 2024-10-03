import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
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

function ButtonBase(
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
	forwardedRef: ForwardedRef<HTMLButtonElement>
) {
	return (
		<button
			data-component='button'
			data-variant={variant}
			aria-disabled={disabled}
			className={cn(buttonVariance({ size }), className)}
			ref={forwardedRef}
			type={disabled ? 'button' : type ?? 'button'}
			onClick={disabled ? undefined : onClick}
			{...rest}
		>
			{children}
		</button>
	);
}

/**
 * Button component
 *
 * @example Simple
 * // Unstyled button
 * <Button>Hello</Button>
 *
 * @example Styled button
 * <Button color='primary' size='small'>Hello</Button>
 *
 * @example With `ref` prop
 * const buttonRef = useRef<ElementRef<'button'>>(null);
 * return <Button ref={buttonRef}>Hello</Button>
 */
export const Button = forwardRef(ButtonBase);
