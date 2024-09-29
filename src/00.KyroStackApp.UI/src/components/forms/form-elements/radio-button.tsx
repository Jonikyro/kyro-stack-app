import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import './radio-button.css';

type RadioButtonProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

function _RadioButton(
	{ className, ...rest }: RadioButtonProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			className={className}
			data-component='radio-button'
			type='radio'
			ref={ref}
			{...rest}
		/>
	);
}

export const RadioButton = forwardRef(_RadioButton);
