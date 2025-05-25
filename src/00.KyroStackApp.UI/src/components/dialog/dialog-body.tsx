import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogBodyProps = ComponentPropsWithoutRef<'div'>;

export function DialogBody({ children, className }: DialogBodyProps) {
	return (
		<div
			data-component='dialog-body'
			className={cn('bg-surface-container', className)}
		>
			{children}
		</div>
	);
}
