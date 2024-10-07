import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type DialogBodyProps = ComponentPropsWithoutRef<'div'>;

export function DialogBody({ children, className }: DialogBodyProps) {
	return (
		<div className={cn('grow overflow-y-auto p-2', className)}>{children}</div>
	);
}
