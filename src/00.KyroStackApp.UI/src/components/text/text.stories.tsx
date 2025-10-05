import type { Story } from '@ladle/react';
import { T } from './t';

export const Basic: Story = () => {
	return <T>Badge</T>;
};

export const VariantProp: Story = () => {
	return (
		<div className='flex flex-col gap-4'>
			<T variant='heading'>{'I am styled as heading text!'}</T>
			<T variant='sub-heading'>{'I am styled as sub-heading text!'}</T>
			<T variant='normal'>{'I am styled as normal text!'}</T>
			<T variant='small'>{'I am styled as small text!'}</T>
		</div>
	);
};

VariantProp.storyName = 'Props--variant';

export const AsProp: Story = () => {
	return (
		<T as='h1' variant='small'>
			{'I am <h1> element!'}
		</T>
	);
};

AsProp.storyName = 'Props--as';
