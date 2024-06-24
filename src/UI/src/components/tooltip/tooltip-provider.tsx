import { Provider } from '@radix-ui/react-tooltip';
import { ComponentProps } from 'react';

type TooltipProviderProps = ComponentProps<typeof Provider>;

export function TooltipProvider(props: TooltipProviderProps) {
	return <Provider {...props} />;
}
