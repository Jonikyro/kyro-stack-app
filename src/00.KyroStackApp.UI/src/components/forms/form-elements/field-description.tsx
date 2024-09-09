import { T } from '@/components/text/t';
import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

const DEFAULT_ELEMENT = 'div';

type FieldDescriptionProps<T extends HtmlElementTagName = 'div'> = {
	id: string;
	as?: T;
} & ComponentPropsWithoutRef<T>;

export function FieldDescription({
	id,
	as,
	className,
	...rest
}: FieldDescriptionProps) {
	return (
		<T
			as={as ?? DEFAULT_ELEMENT}
			variant='small'
			id={id}
			className={cn('text-muted whitespace-normal', className)}
			data-component='field-description'
			{...rest}
		/>
	);
}
