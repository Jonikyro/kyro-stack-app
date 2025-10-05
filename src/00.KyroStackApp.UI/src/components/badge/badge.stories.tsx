import type { Story } from '@ladle/react';
import { Badge } from './badge';

export const Basic: Story = () => {
	return <Badge>Badge</Badge>;
};

export const Colors: Story = () => {
	return (
		<div className='flex gap-4'>
			<Badge color='blue'>Blue</Badge>
			<Badge color='green'>Green</Badge>
			<Badge color='red'>Red</Badge>
			<Badge color='yellow'>Yellow</Badge>
			<Badge color='violet'>Violet</Badge>
		</div>
	);
};

Colors.storyName = 'Props--color';

export const AsProp: Story = () => {
	return (
		<Badge as='a' href='#'>
			{'I am a <a> element!'}
		</Badge>
	);
};

AsProp.storyName = 'Props--as';
