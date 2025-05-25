import { ComponentPropsWithoutRef } from 'react';

type SummaryProps = ComponentPropsWithoutRef<'summary'>;

export function Summary(props: SummaryProps) {
	return <Summary data-component='summary' {...props} />;
}
