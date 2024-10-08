import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogHeaderProps = ComponentPropsWithoutRef<'footer'>;

export function DialogFooter({ children, className }: DialogHeaderProps) {
	return (
		<footer className={cn('shrink-0 bg-surface-container-high p-2', className)}>
			{children}
		</footer>
	);
}
