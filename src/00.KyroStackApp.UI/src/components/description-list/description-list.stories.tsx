import type { Story } from '@ladle/react';
import { T } from '../text/t';
import { Dd, Dl, Dt } from './description-list';

export const Basic: Story = () => {
	return (
		<Dl>
			<Dt>Name</Dt>
			<Dd>Godzilla</Dd>
			<Dt>Born</Dt>
			<Dd>1952</Dd>
			<Dt>Birthplace</Dt>
			<Dd>Japan</Dd>
			<Dt>Color</Dt>
			<Dd>Green</Dd>
		</Dl>
	);
};

export const WithContainer: Story = () => {
	return (
		<div>
			<Dl.Container>
				<T as='h2' variant='normal' className='my-5'>
					# Interesting Facts
				</T>
				<Dl>
					<Dt>Name</Dt>
					<Dd>Godzilla</Dd>
					<Dt>Born</Dt>
					<Dd>1952</Dd>
					<Dt>Birthplace</Dt>
					<Dd>Japan</Dd>
					<Dt>Color</Dt>
					<Dd>Green</Dd>
				</Dl>
			</Dl.Container>

			<Dl.Container className='mt-5 max-w-[30ch]'>
				<T as='h2' variant='normal' className='my-5'>
					# Interesting Facts
				</T>
				<Dl>
					<Dt>Name</Dt>
					<Dd>Godzilla</Dd>
					<Dt>Born</Dt>
					<Dd>1952</Dd>
					<Dt>Birthplace</Dt>
					<Dd>Japan</Dd>
					<Dt>Color</Dt>
					<Dd>Green</Dd>
				</Dl>
			</Dl.Container>
		</div>
	);
};
