import type { Story } from '@ladle/react';
import { DateFieldBase } from '@react-types/datepicker';
import { DateValue } from 'react-aria';
import { DateField } from './date-field';

export const Basic: Story = () => {
	return <DateField />;
};

export const Granularity: Story = () => {
	return (
		<div>
			<div>
				<span>Default</span>
				<DateField />
			</div>
			<div>
				<span>Month</span>
				<DateField
					granularity={
						'month' as unknown as DateFieldBase<DateValue>['granularity']
					}
				/>
			</div>
			<div>
				<span>Day</span>
				<DateField granularity='day' />
			</div>
			<div>
				<span>Hour</span>
				<DateField granularity='hour' />
			</div>
			<div>
				<span>Minute</span>
				<DateField granularity='minute' />
			</div>
			<div>
				<span>Second</span>
				<DateField granularity='second' />
			</div>
		</div>
	);
};
