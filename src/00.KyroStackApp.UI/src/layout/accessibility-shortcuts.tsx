import { T } from '@/components/text/t';

export function AccessibilityShortcuts() {
	return (
		<nav aria-label='Keyboard shortcuts' className='absolute left-0 top-0'>
			<T className='sr-only focus:not-sr-only' as='a' href='#main-content'>
				Main content
			</T>
		</nav>
	);
}
