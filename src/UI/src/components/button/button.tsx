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
		startIcon?: IconName;
		endIcon?: IconName;
	};

function ButtonBase(
	{
		children,
		className,
		disabled,
		startIcon,
		endIcon,
		variant,
		onClick,
		onPointerDown,
		...rest
	}: ButtonProps,
	forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const ref = useMergeRefs(buttonRef, forwardedRef);

	const { buttonProps, isPressed } = useButton(
		{
			isDisabled: disabled,
			onPress: onClick as any,
			...rest
		},
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
			onPointerDown={onPointerDown ?? buttonProps.onPointerDown}
		>
			{!!startIcon && <Icon icon={startIcon} size='font' />}
			{children}
			{!!endIcon && <Icon icon={endIcon} size='font' />}
		</button>
	);
}

export const Button = forwardRef(ButtonBase);
