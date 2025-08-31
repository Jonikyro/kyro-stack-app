import { ComponentPropsWithoutRef, forwardRef } from 'react';

import './container.css';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {}

export const Container = forwardRef(function Container(
	props: ContainerProps,
	ref: React.Ref<HTMLDivElement>
) {
	return <div data-component='container' ref={ref} {...props} />;
});
