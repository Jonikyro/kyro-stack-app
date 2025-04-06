import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

type LabelProps = ComponentPropsWithRef<'label'>;

export const Label = forwardRef(function Label(
	props: LabelProps,
	ref: ForwardedRef<HTMLLabelElement>
) {
	return <label data-component='label' ref={ref} {...props} />;
});
