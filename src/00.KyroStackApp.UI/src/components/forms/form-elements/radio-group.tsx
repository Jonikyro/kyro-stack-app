import { T } from '@/components/text/t';
import { cn } from '@/utils/cn';
import { useId } from '@/utils/use-id';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type RadioGroupProps = {
	label: ReactNode;
	labelClassName?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'role' | 'aria-labelledby'>;

export function RadioGroup({
	className,
	children,
	label,
	labelClassName,
	...rest
}: RadioGroupProps) {
	const labelId = useId();

	return (
		<div
			role='radiogroup'
			aria-labelledby={labelId}
			className={cn('', className)}
			data-component='radio-group'
			{...rest}
		>
			<T
				as='div'
				variant='regular'
				id={labelId}
				className={cn('text-lg', labelClassName)}
			>
				{label}
			</T>
			{children}
		</div>
	);
}
