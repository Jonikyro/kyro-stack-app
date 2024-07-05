import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

const buttonVariance = cva(
	// Default styles
	'inline-flex items-center justify-center gap-[0.7ch] tracking-wide border-2',
	{
		variants: {
			color: {
				primary: [
					'bg-primary',
					'text-on-primary',
					'border-primary',
					'hocus:border-hover-primary',
					'hocus:bg-hover-primary'
				],
				secondary: [
					'bg-secondary',
					'text-on-secondary',
					'border-secondary',
					'hocus:border-hover-secondary',
					'hocus:bg-hover-secondary'
				],
				tertiary: [
					'bg-tertiary',
					'text-on-tertiary',
					'border-tertiary',
					'hocus:border-hover-tertiary',
					'hocus:bg-hover-tertiary'
				]
			},
			size: {
				small: ['min-h-8 py-1 px-2 rounded-sm text-sm'],
				default: ['min-h-10 py-2 px-4 rounded'],
				large: ['min-h-12 py-3 px-5 rounded-md text-lg']
			}
		},
		defaultVariants: {
			color: 'primary',
			size: 'default'
		}
	}
);

export type ButtonProps = VariantProps<typeof buttonVariance> &
	ComponentPropsWithoutRef<'button'>;

function ButtonBase(
	{
		children,
		className,
		color,
		disabled,
		onClick,
		size,
		type,
		...rest
	}: ButtonProps,
	forwardedRef: ForwardedRef<HTMLButtonElement>
) {
	return (
		<button
			data-component='button'
			aria-disabled={disabled}
			className={cn(
				buttonVariance({ color, size }),
				disabled &&
					'text-on-disabled border-disabled bg-disabled hocus:bg-disabled pointer-events-none',
				className
			)}
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
