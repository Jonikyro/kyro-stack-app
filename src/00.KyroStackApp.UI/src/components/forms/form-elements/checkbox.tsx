import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

function _Checkbox(
	{ className, ...rest }: CheckboxProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			className={cn('h-6 w-6 shrink-0 accent-secondary', className)}
			data-component='checkbox'
			type='checkbox'
			ref={ref}
			{...rest}
		/>
	);
}

export const Checkbox = forwardRef(_Checkbox);
