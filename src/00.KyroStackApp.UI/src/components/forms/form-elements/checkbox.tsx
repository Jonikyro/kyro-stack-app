import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import './checkbox.css';

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

function _Checkbox(
	{ className, ...rest }: CheckboxProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			className={cn(
				'h-6 w-6 shrink-0 accent-tertiary-container outline-none',
				className
			)}
			data-component='checkbox'
			type='checkbox'
			ref={ref}
			{...rest}
		/>
	);
}

export const Checkbox = forwardRef(_Checkbox);
