import * as Tooltip from '@radix-ui/react-tooltip';
import { ComponentPropsWithoutRef } from 'react';
import './tooltips.css';

type TooltipRootProps = ComponentPropsWithoutRef<typeof Tooltip.Root>;

function Root(props: TooltipRootProps) {
	return <Tooltip.Root {...props} />;
}

type TooltipTriggerProps = ComponentPropsWithoutRef<typeof Tooltip.Trigger>;

function Trigger(props: TooltipTriggerProps) {
	return (
		<Tooltip.Trigger
			data-component='tooltip-trigger'
			type='button'
			{...props}
		/>
	);
}

type TooltipContentProps = ComponentPropsWithoutRef<typeof Tooltip.Content> &
	ComponentPropsWithoutRef<typeof Tooltip.Portal> & {
		showArrow?: boolean;
	};

function Content({
	children,
	container,
	forceMount,
	showArrow,
	...rest
}: TooltipContentProps) {
	return (
		<Tooltip.Portal container={container} forceMount={forceMount}>
			<Tooltip.Content data-component='tooltip-content' {...rest}>
				{children}
				{showArrow && <Tooltip.Arrow data-component='tooltip-arrow' />}
			</Tooltip.Content>
		</Tooltip.Portal>
	);
}

export { Content, Root, Trigger };
