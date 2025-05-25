import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogHeaderProps = ComponentPropsWithoutRef<'footer'>;

export function DialogFooter({ children, className }: DialogHeaderProps) {
	return (
		<footer
			data-component='dialog-footer'
			className={cn('bg-surface-container-high', className)}
		>
			{children}
		</footer>
	);
}
