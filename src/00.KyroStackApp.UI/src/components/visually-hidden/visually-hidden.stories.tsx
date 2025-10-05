import type { Story } from '@ladle/react';
import { VisuallyHidden } from './visually-hidden';

export const Basic: Story = () => {
	return <VisuallyHidden>Can't see me!</VisuallyHidden>;
};

export const AsProp: Story = () => {
	return (
		<VisuallyHidden as='a' href='#'>
			{'I am <a> element!'}
		</VisuallyHidden>
	);
};

AsProp.storyName = 'Props--as';
