import { ComponentPropsWithoutRef } from 'react';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

export function Header({ children, ...rest }: HeaderProps) {
	return <header {...rest}>{children}</header>;
}
