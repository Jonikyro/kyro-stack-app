import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import './checkbox.css';

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Checkbox = forwardRef(function Checkbox(
	{ className, ...rest }: CheckboxProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			className={className}
			data-component='checkbox'
			type='checkbox'
			ref={ref}
			{...rest}
		/>
	);
});
