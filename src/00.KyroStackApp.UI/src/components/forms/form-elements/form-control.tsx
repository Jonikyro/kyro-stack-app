import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

const DEFAULT_ELEMENT = 'div';

type FormControlProps<T extends HtmlElementTagName = 'div'> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

export function FormControl({ as, className, ...rest }: FormControlProps) {
	const As = as ?? DEFAULT_ELEMENT;

	return (
		<As
			className={cn(
				'flex cursor-text overflow-hidden whitespace-nowrap rounded border border-solid border-outline bg-surface-container-lowest text-on-surface focus-within:border-primary',
				className
			)}
			data-component='form-control'
			{...rest}
		/>
	);
}
