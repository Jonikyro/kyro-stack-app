import { createLink } from '@tanstack/react-router';
import { AnchorHTMLAttributes, forwardRef } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = createLink(
	forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
		return <a data-component='link' ref={ref} {...props} />;
	})
);
