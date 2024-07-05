import { Text } from '@/components/text/text';

export function AccessibilityShortcuts() {
	return (
		<nav aria-label='Keyboard shortcuts' className='absolute left-0 top-0'>
			<Text className='sr-only focus:not-sr-only' as='a' href='#main-content'>
				Main content
			</Text>
		</nav>
	);
}
