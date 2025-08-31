import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import { Container, ContainerProps } from '../container/container';

import './description-list.css';

function DlContainer(props: ContainerProps) {
	return <Container data-type='description-list' {...props} />;
}

export interface DtProps extends ComponentPropsWithoutRef<'dt'> {}

export function Dt(props: DtProps) {
	return <dt data-component='description-list-dt' {...props} />;
}

export interface DdProps extends ComponentPropsWithoutRef<'dd'> {}

export function Dd(props: DdProps) {
	return <dd data-component='description-list-dd' {...props} />;
}

export interface DlProps extends ComponentPropsWithoutRef<'dl'> {}

/**
 * Abstraction over `<dl>` `<dt>` and `<dd>` elements.
 *
 * @example
 * Basic usage
 * ```tsx
 * <Dl.Container>
 *   <Dl>
 *     <Dt>Human</Dt>
 *     <Dd>Homo sapiens, species of primate</Dd>
 *   </Dl>
 * </Dl.Container>
 * ```
 */
export const Dl = Object.assign(
	forwardRef(function (props: DlProps, ref: ForwardedRef<HTMLDListElement>) {
		return <dl data-component='description-list' ref={ref} {...props} />;
	}),
	{
		displayName: 'DescriptionList',
		Container: DlContainer
	}
);
