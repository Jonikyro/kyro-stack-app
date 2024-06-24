import { ComponentPropsWithoutRef } from 'react';

type MainProps = ComponentPropsWithoutRef<'main'>;

export function Main(props: MainProps) {
	return <main id='page-main' {...props} />;
}
