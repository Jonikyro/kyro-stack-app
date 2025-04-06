import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

export const Textarea = forwardRef(function Textarea(
	{ className, ...rest }: TextareaProps,
	ref: ForwardedRef<HTMLTextAreaElement>
) {
	return (
		<textarea
			autoComplete='off'
			data-component='textarea'
			className={cn(
				'min-h-[5ch] w-full resize-y border-none bg-transparent p-[0.5ch] text-on-surface outline-none',
				className
			)}
			ref={ref}
			{...rest}
		/>
	);
});
