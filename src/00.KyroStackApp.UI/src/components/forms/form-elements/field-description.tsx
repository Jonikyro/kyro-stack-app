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
	children,
	...rest
}: FieldDescriptionProps) {
	const As = as ?? DEFAULT_ELEMENT;

	return (
		<As
			id={id}
			className={cn('leading-4', className)}
			data-component='field-description'
			{...rest}
		>
			<T className='whitespace-normal' variant='small'>
				{children}
			</T>
		</As>
	);
}
