import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogHeaderProps = ComponentPropsWithoutRef<'header'>;

export function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<header
			className={cn(
				'z-10 shrink-0 bg-surface-container-high p-2 shadow',
				className
			)}
		>
			{children}
		</header>
	);
}
