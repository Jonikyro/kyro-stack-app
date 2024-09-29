import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogHeaderProps = ComponentPropsWithoutRef<'header'>;

export function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<header className={cn('bg-surface-container-high p-2', className)}>
			{children}
		</header>
	);
}
