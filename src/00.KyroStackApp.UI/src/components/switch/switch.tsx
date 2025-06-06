import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import './switch.css';

export type SwitchProps = Omit<
	ComponentPropsWithoutRef<'input'>,
	'type' | 'role'
>;

/**
 * Switch component that is using `<input>` as its base.
 *
 * @example Simple
 * ```tsx
 * <Switch checked />
 * ```
 */
export const Switch = forwardRef(function Switch(
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
});
