import {
	ComponentPropsWithoutRef,
	ElementRef,
	ForwardedRef,
	forwardRef
} from 'react';
import './scroll-container.css';

export type ScrollContainerProps<T extends HtmlElementTagName> = {
	as?: T;
	axis: 'x' | 'y';
} & ComponentPropsWithoutRef<T>;

export const ScrollContainer = forwardRef(function <
	T extends HtmlElementTagName = 'div'
>(
	{ as, axis, children, ...rest }: ScrollContainerProps<T>,
	forwardedRef: ForwardedRef<ElementRef<T>>
) {
	const As = as ?? 'div';

	return (
		<As
			data-component='scroll-container'
			data-axis={axis}
			ref={forwardedRef as null}
			{...rest}
		>
			{children}
		</As>
	);
});
