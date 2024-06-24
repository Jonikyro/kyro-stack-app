import { Button } from '@/components/button/button';
import type {
	DropdownMenuProps,
	DropdownMenuTriggerProps
} from '@radix-ui/react-dropdown-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ComponentPropsWithoutRef } from 'react';
import { Icon } from '../icon';
import './dropdown-menus.css';

/**
 * @file Documentation for Radix DropdownMenu can be found here: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 */

type DropdownRootProps = DropdownMenuProps;

function Root(props: DropdownRootProps) {
	return <DropdownMenu.Root {...props} data-component='dropdown-root' />;
}

type DropdownTriggerProps = DropdownMenuTriggerProps &
	Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onPress' | 'onClick'>;

function Trigger({ children, ...rest }: DropdownTriggerProps) {
	return (
		<DropdownMenu.Trigger asChild>
			<Button {...rest}>{children}</Button>
		</DropdownMenu.Trigger>
	);
}

type DropdownContentProps = ComponentPropsWithoutRef<
	typeof DropdownMenu.Content
> &
	ComponentPropsWithoutRef<typeof DropdownMenu.Portal>;

function Content({
	children,
	forceMount,
	container,
	...rest
}: DropdownContentProps) {
	return (
		<DropdownMenu.Portal forceMount={forceMount} container={container}>
			<DropdownMenu.Content {...rest} data-component='dropdown-content'>
				{children}
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	);
}

type DropdownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

function Item(props: DropdownItemProps) {
	return <DropdownMenu.Item {...props} data-component='dropdown-item' />;
}

type DropdownLabelProps = ComponentPropsWithoutRef<typeof DropdownMenu.Label>;

function Label(props: DropdownLabelProps) {
	return <DropdownMenu.Label {...props} data-component='dropdown-label' />;
}

type DropdownSeparatorProps = ComponentPropsWithoutRef<
	typeof DropdownMenu.Separator
>;

function Separator(props: DropdownSeparatorProps) {
	return (
		<DropdownMenu.Separator {...props} data-component='dropdown-separator' />
	);
}

type DropdownSubProps = ComponentPropsWithoutRef<typeof DropdownMenu.Sub>;

function Sub(props: DropdownSubProps) {
	return <DropdownMenu.Sub {...props} data-component='dropdown-sub' />;
}

type DropdownSubTriggerProps = ComponentPropsWithoutRef<
	typeof DropdownMenu.SubTrigger
>;

function SubTrigger({ children, ...rest }: DropdownSubTriggerProps) {
	return (
		<DropdownMenu.SubTrigger
			data-component='dropdown-sub-trigger'
			className='flex'
		>
			{children}
			<Icon icon='chevron-right' />
		</DropdownMenu.SubTrigger>
	);
}

type DropdownSubContentProps = ComponentPropsWithoutRef<
	typeof DropdownMenu.SubContent
> &
	ComponentPropsWithoutRef<typeof DropdownMenu.Portal>;

function SubContent({
	forceMount,
	container,
	...rest
}: DropdownSubContentProps) {
	return (
		<DropdownMenu.Portal forceMount={forceMount} container={container}>
			<DropdownMenu.SubContent
				{...rest}
				data-component='dropdown-sub-content'
			/>
		</DropdownMenu.Portal>
	);
}

export {
	Content,
	Item,
	Label,
	Root,
	Separator,
	Sub,
	SubContent,
	SubTrigger,
	Trigger
};
