import type { Story } from '@ladle/react';
import { Button } from './button';

export const Basic: Story = () => {
	return <Button>Button</Button>;
};

export const Sizes: Story = () => {
	return (
		<div className='flex items-center gap-4'>
			<Button size='small'>Small</Button>
			<Button size='default'>Default</Button>
			<Button size='large'>Large</Button>
		</div>
	);
};

Sizes.storyName = 'Props--size';

export const Variants: Story = () => {
	return (
		<div className='flex gap-4'>
			<Button variant='primary'>Primary</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='tertiary'>Tertiary</Button>
		</div>
	);
};

Variants.storyName = 'Props--variant';

export const Disabled: Story = () => {
	return (
		<div className='flex items-center gap-4'>
			<Button variant='primary' disabled>
				Disabled
			</Button>
		</div>
	);
};

Disabled.storyName = 'Props--disabled';
