import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import './textarea.css';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

export const Textarea = forwardRef(function Textarea(
	{ className, ...rest }: TextareaProps,
	ref: ForwardedRef<HTMLTextAreaElement>
) {
	return (
		<textarea
			autoComplete='off'
			className={className}
			data-component='textarea'
			ref={ref}
			{...rest}
		/>
	);
});
