import { T } from '@/components/text/t';
import { cn } from '@/utils/cn';
import { useId } from '@/utils/use-id';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type InputGroupProps = {
	label: ReactNode;
	labelClassName?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'aria-labelledby'>;

export function InputGroup({
	className,
	children,
	label,
	labelClassName,
	...rest
}: InputGroupProps) {
	const labelId = useId();

	return (
		<div
			role='group'
			aria-labelledby={labelId}
			className={className}
			data-component='radio-group'
			{...rest}
		>
			<T
				as='div'
				variant='normal'
				id={labelId}
				className={cn('text-lg', labelClassName)}
			>
				{label}
			</T>
			{children}
		</div>
	);
}
