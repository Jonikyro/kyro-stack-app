import { cn } from '@/utils/cn';
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	LegacyRef
} from 'react';

const DEFAULT_ELEMENT = 'div';

type FormControlProps<T extends HtmlElementTagName> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

export const FormControl = forwardRef(function FormControl<
	T extends HtmlElementTagName = 'div'
>(
	{ as, className, ...rest }: FormControlProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>
) {
	const As = as ?? DEFAULT_ELEMENT;

	return (
		<As
			ref={ref as LegacyRef<HTMLDivElement>}
			className={cn(
				'border-outline-solid bg-surface-container-lowest text-on-surface outline-primary focus-within:border-primary flex cursor-text overflow-hidden rounded border-2 border-solid whitespace-nowrap outline-hidden outline-0 outline-offset-0 focus-within:outline-2',
				className
			)}
			data-component='form-control'
			{...rest}
		/>
	);
});
