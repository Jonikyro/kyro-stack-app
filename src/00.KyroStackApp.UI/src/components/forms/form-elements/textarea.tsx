import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

function _Textarea(
	{ className, ...rest }: TextareaProps,
	ref: ForwardedRef<HTMLTextAreaElement>
) {
	return (
		<textarea
			autoComplete='off'
			data-component='textarea'
			className={cn(
				'min-h-[5ch] w-full resize-y border-none bg-transparent outline-none',
				className
			)}
			ref={ref}
			{...rest}
		/>
	);
}

export const Textarea = forwardRef(_Textarea);