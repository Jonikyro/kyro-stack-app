import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

export type SwitchProps = Omit<
	ComponentPropsWithoutRef<'input'>,
	'type' | 'role'
>;

function SwitchBase(
	{ ...rest }: SwitchProps,
	forwardedRef: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			data-component='switch'
			type='checkbox'
			role='switch'
			ref={forwardedRef}
			{...rest}
		/>
	);
}

export const Switch = forwardRef(SwitchBase);
