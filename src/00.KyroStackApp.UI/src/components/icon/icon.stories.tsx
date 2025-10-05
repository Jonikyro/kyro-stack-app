import type { Story } from '@ladle/react';
import { Icon } from './icon';

export const Basic: Story = () => {
	return (
		<div className='flex gap-1'>
			<Icon icon='gear' />
		</div>
	);
};

export const ChangeColor: Story = () => {
	return (
		<div className='flex gap-4 text-4xl'>
			<Icon icon='asterisk' className='text-error' />
			<Icon icon='paper-plane' className='text-primary' />
		</div>
	);
};

ChangeColor.storyName = 'Change color';

export const SizeProp: Story = () => {
	return (
		<div className='grid grid-cols-[auto_1fr] items-center gap-4 place-self-center text-4xl'>
			<span className='justify-self-end'>xs</span>
			<Icon icon='paper-plane' size='xs' className='col-start-2' />

			<span className='justify-self-end'>sm</span>
			<Icon icon='paper-plane' size='sm' className='col-start-2' />

			<span className='justify-self-end'>md</span>
			<Icon icon='paper-plane' size='md' className='col-start-2' />

			<span className='justify-self-end'>lg</span>
			<Icon icon='paper-plane' size='lg' className='col-start-2' />

			<span className='justify-self-end'>xl</span>
			<Icon icon='paper-plane' size='xl' className='col-start-2' />

			<span className='justify-self-end'>Font size (default)</span>
			<Icon icon='paper-plane' size='font' />
		</div>
	);
};

SizeProp.storyName = 'Props--size';
