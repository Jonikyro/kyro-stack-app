import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

export type InputProps = ComponentPropsWithoutRef<'input'>;

function _Input(
	{ className, ...rest }: InputProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			autoComplete='off'
			data-component='input'
			className={cn(
				'w-full border-none bg-transparent p-[0.5ch] text-on-surface outline-none',
				className
			)}
			ref={ref}
			{...rest}
		/>
	);
}

export const Input = forwardRef(_Input);
