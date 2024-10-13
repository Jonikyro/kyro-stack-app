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
				'flex cursor-text overflow-hidden whitespace-nowrap rounded border-2 border-solid border-outline bg-surface-container-lowest text-on-surface outline-none outline-0 outline-offset-0 outline-primary focus-within:border-primary focus-within:outline-2',
				className
			)}
			data-component='form-control'
			{...rest}
		/>
	);
}
