import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

type LabelProps = ComponentPropsWithRef<'label'>;

function _Label(props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) {
	return <label data-component='label' ref={ref} {...props} />;
}

export const Label = forwardRef(_Label);
