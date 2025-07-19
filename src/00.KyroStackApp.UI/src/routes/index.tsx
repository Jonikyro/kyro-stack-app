import { T } from '@/components/text/t';
import { DesignSystem } from '@/features/design-system/design-system';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Index });

function Index() {
	return (
		<div>
			<T as='h1' variant='heading'>
				Design system
			</T>
			<DesignSystem />
		</div>
	);
}
