import { CalendarDate } from '@internationalized/date';
import type { Story } from '@ladle/react';
import { Calendar } from './calendar';

export const Basic: Story = () => {
	return <Calendar />;
};

export const HideMonthButtons: Story = () => {
	return <Calendar hideMonthButtons />;
};

HideMonthButtons.storyName = 'Props--hide-month-buttons';

export const MaxAndMinValues: Story = () => {
	const min = new CalendarDate(2023, 11, 15);
	const max = new CalendarDate(2023, 12, 24);

	return <Calendar minValue={min} maxValue={max} />;
};

MaxAndMinValues.storyName = 'Props--min-and-max-values';

export const WithErrorMessage: Story = () => {
	return <Calendar isInvalid errorMessage='This is an error message' />;
};

WithErrorMessage.storyName = 'Props--error-message';

export const DefaultValue: Story = () => {
	const defaultValue = new CalendarDate(2023, 11, 25);
	return <Calendar defaultValue={defaultValue} />;
};

DefaultValue.storyName = 'Props--default-value';
