import { ComponentPropsWithoutRef } from 'react';

import './form-group.css';

const DEFAULT_ELEMENT = 'div';

type FormGroupProps<T extends HtmlElementTagName = 'div'> = {
	as?: T;
} & ComponentPropsWithoutRef<T>;

export function FormGroup({ as, className, ...rest }: FormGroupProps) {
	const As = as ?? DEFAULT_ELEMENT;

	return <As className={className} data-component='form-group' {...rest} />;
}
