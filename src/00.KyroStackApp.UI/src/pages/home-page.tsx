import { T } from '@/components/text/t';
import { DesignSystem } from '@/features/design-system/design-system';

export function Component() {
	return (
		<div>
			<T as='h1' variant='heading'>
				Design system
			</T>
			<DesignSystem />
		</div>
	);
}

Component.displayName = 'HomePage';
