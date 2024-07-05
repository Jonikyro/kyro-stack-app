import { ComponentPropsWithoutRef } from 'react';

export type FooterProps = ComponentPropsWithoutRef<'footer'>;

export function Footer({ children, ...rest }: FooterProps) {
	return <footer {...rest}>{children}</footer>;
}
