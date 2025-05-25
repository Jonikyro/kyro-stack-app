import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogHeaderProps = ComponentPropsWithoutRef<'header'>;

export function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<header
			data-component='dialog-header'
			className={cn('relative bg-surface-container-high shadow', className)}
		>
			{children}
		</header>
	);
}
