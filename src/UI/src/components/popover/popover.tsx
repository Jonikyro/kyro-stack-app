import { Button } from '@/components/button/button';
import {
	Anchor as PopoverAnchor,
	Content as PopoverContent,
	PopoverProps,
	Root as PopoverRoot,
	Trigger as PopoverTrigger,
	Portal
} from '@radix-ui/react-popover';
import { ComponentProps } from 'react';

type PopoverRootProps = PopoverProps;

function Root({ children, ...rest }: PopoverRootProps) {
	return (
		<PopoverRoot {...rest} data-component='popover-root'>
			{children}
		</PopoverRoot>
	);
}

type PopoverTriggerProps = {
	children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onPress' | 'onClick'>;

function Trigger({ children, ...props }: PopoverTriggerProps) {
	return (
		<PopoverTrigger asChild>
			<Button {...props}>{children}</Button>
		</PopoverTrigger>
	);
}

type PopoverContentProps = ComponentProps<typeof PopoverContent> &
	ComponentProps<typeof Portal>;

function Content({
	children,
	forceMount,
	container,
	...rest
}: PopoverContentProps) {
	return (
		<Portal forceMount={forceMount} container={container}>
			<PopoverContent data-component='popover-content' {...rest}>
				{children}
			</PopoverContent>
		</Portal>
	);
}

type PopoverAnchorProps = ComponentProps<typeof PopoverAnchor>;

function Anchor({ children, ...rest }: PopoverAnchorProps) {
	return <PopoverAnchor {...rest}>{children}</PopoverAnchor>;
}

export { Anchor, Content, Root, Trigger };
