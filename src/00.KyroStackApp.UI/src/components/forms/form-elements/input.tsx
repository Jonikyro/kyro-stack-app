import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import './input.css';

export type InputProps = ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef(function Input(
	{ className, ...rest }: InputProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			autoComplete='off'
			spellCheck={false}
			data-component='input'
			className={className}
			ref={ref}
			{...rest}
		/>
	);
});
