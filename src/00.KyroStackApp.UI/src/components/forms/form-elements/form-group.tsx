import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

const DEFAULT_ELEMENT = 'div';

type FormGroupProps<T extends HtmlElementTagName = 'div'> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

export function FormGroup({ as, className, ...rest }: FormGroupProps) {
	const As = as ?? DEFAULT_ELEMENT;

	return (
		<As
			className={cn('grid grid-cols-1 gap-4 py-4 md:grid-cols-2', className)}
			data-component='form-group'
			{...rest}
		/>
	);
}
