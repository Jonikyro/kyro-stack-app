import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

const DEFAULT_ELEMENT = 'div';

type FormElementProps<T extends HtmlElementTagName = 'div'> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

export function FormElement({ as, className, ...rest }: FormElementProps) {
	const As = as ?? DEFAULT_ELEMENT;

	return (
		<As
			className={cn('flex-auto', className)}
			data-component='form-element'
			{...rest}
		/>
	);
}
