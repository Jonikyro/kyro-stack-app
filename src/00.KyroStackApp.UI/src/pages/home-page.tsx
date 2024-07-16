import { DesignSystem } from '@/components/design-system/design-system';
import { T } from '@/components/text/t';

export function Component() {
	return (
		<div>
			<T as='h1' variant='heading'>Design system</T>
			<DesignSystem />
		</div>
	);
}

Component.displayName = 'HomePage';
