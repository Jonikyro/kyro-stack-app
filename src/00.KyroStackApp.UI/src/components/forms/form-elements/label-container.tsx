import { ComponentPropsWithoutRef } from 'react';

const DEFAULT_ELEMENT = 'div';

type LabelContainerProps<T extends HtmlElementTagName = 'div'> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

export function LabelContainer({ as, ...rest }: LabelContainerProps) {
	const As = as ?? DEFAULT_ELEMENT;

	return <As data-component='label-container' {...rest} />;
}
