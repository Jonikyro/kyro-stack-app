import { useMergeRefs } from '@/utils/use-merge-refs';
import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import { Icon, type IconName } from '../icon';
import './buttons.css';

type ButtonVariants =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'destructive'
	| 'unstyled';

type ButtonProps = ComponentPropsWithoutRef<'button'> &
	AriaButtonProps & {
		variant?: ButtonVariants;
		icon?: IconName;
	};

function ButtonBase(
	{
		children,
		className,
		disabled,
		icon,
		variant,
		onClick,
		...rest
	}: ButtonProps,
	forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const ref = useMergeRefs(buttonRef, forwardedRef);

	const { buttonProps, isPressed } = useButton(
		{ onPress: onClick as any, ...rest, isDisabled: disabled },
		buttonRef
	);

	return (
		<button
			ref={ref}
			type='button'
			className={className}
			data-component='button'
			data-variant={variant}
			data-pressed={isPressed}
			{...buttonProps}
		>
			{!!icon && <Icon icon={icon} size='font' />}
			{children}
		</button>
	);
}

export const Button = forwardRef(ButtonBase);
