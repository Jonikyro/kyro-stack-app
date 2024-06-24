import { Button } from '@/components/button/button';
import {
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
} & React.ComponentPropsWithoutRef<typeof Button>;

function Trigger({ children, ...props }: PopoverTriggerProps) {
	return (
		<PopoverTrigger asChild>
			<Button {...props}>{children}</Button>
		</PopoverTrigger>
	);
}

type PopoverContentProps = ComponentProps<typeof PopoverContent>;

function Content({ children, ...rest }: PopoverContentProps) {
	return (
		<Portal>
			<PopoverContent data-component='popover-content' {...rest}>
				{children}
			</PopoverContent>
		</Portal>
	);
}

export { Content, Root, Trigger };
