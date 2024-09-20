import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type InputFixProps = {
	inputId: string;
} & Omit<ComponentPropsWithoutRef<'label'>, 'aria-hidden' | 'htmlFor'>;

export function InputFix({ inputId, className, ...rest }: InputFixProps) {
	return (
		<label
			htmlFor={inputId}
			aria-hidden
			className={cn(
				'inline-flex items-center bg-surface-container p-[0.5ch]',
				className
			)}
			{...rest}
		/>
	);
}
