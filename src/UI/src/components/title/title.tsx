import React, { useCallback } from 'react';
import { Icon } from '../icon';

type ReactHtmlElement = React.ElementType & keyof HTMLElementTagNameMap;

type LinkableTitleProps =
	| {
			linkable: true;
			id: string;
	  }
	| {
			linkable?: false;
			id?: string;
	  };

type TitleProps<T extends ReactHtmlElement> = {
	as: T;
	children: React.ReactNode;
} & LinkableTitleProps &
	React.ComponentPropsWithoutRef<T>;

function TitleBase<T extends ReactHtmlElement>(
	{ as, children, id, linkable, ...rest }: TitleProps<T>,
	forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>
) {
	const As = as as React.ElementType;

	return (
		<As data-component='title' ref={forwardedRef} id={id} {...rest}>
			<span className='inline-flex items-center'>
				{children}
				{linkable && <CopyLinkToMe id={id} />}
			</span>
		</As>
	);
}

function CopyLinkToMe({ id }: { id: string }) {
	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(
			location.href.replace(location.hash, '') + '#' + id
		);
	}, []);

	return (
		<button className='ml-[0.6ch] flex' onClick={onCopy}>
			<Icon icon='link' />
		</button>
	);
}

export const Title = React.forwardRef(TitleBase);
