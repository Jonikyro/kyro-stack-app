import { ComponentPropsWithoutRef } from 'react';

export type InputFixProps = {
	inputId: string;
} & Omit<ComponentPropsWithoutRef<'label'>, 'aria-hidden' | 'htmlFor'>;

import './input-fix.css';

export function InputFix({ inputId, className, ...rest }: InputFixProps) {
	return (
		<label
			htmlFor={inputId}
			aria-hidden
			data-component='input-fix'
			className={className}
			{...rest}
		/>
	);
}
