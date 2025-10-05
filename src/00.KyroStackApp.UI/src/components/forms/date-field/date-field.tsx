import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import {
	AriaDateFieldProps,
	DateValue,
	useDateField,
	useDateSegment,
	useLocale
} from 'react-aria';
import { DateFieldState, DateSegment, useDateFieldState } from 'react-stately';
import { FormControl } from '../form-elements/form-control';
import './date-field.css';

export interface DateFieldProps<T extends DateValue>
	extends AriaDateFieldProps<T> {}

export function DateField<T extends DateValue>(props: DateFieldProps<T>) {
	const { locale } = useLocale();
	const ref = useRef(null);

	const state = useDateFieldState({
		locale,
		createCalendar,
		...props
	});

	const { fieldProps } = useDateField(props, state, ref);

	return (
		<FormControl {...fieldProps} ref={ref} data-component='date-field'>
			<span>
				{state.segments.map((segment, i) => (
					<Segment key={i} segment={segment} state={state} />
				))}
			</span>
		</FormControl>
	);
}

type DateSegmentProps = {
	segment: DateSegment;
	state: DateFieldState;
};

function Segment({ segment, state }: DateSegmentProps) {
	const ref = useRef<HTMLElement>(null);
	const { segmentProps } = useDateSegment(segment, state, ref);

	return (
		<span
			data-component='date-field-segment'
			data-segment-type={segment.type}
			{...segmentProps}
			ref={ref}
		>
			{segment.text}
		</span>
	);
}
