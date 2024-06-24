import { useId } from '@/utils/use-id';
import {
	CalendarDate,
	createCalendar,
	getWeeksInMonth
} from '@internationalized/date';
import React, { ComponentPropsWithoutRef, useRef } from 'react';
import {
	AriaCalendarCellProps,
	useCalendar,
	useCalendarCell,
	useCalendarGrid,
	useLocale,
	type AriaCalendarProps,
	type DateValue
} from 'react-aria';
import { CalendarState, useCalendarState } from 'react-stately';
import { Button } from '../button/button';
import { Icon } from '../icon';
import { Title } from '../title/title';
import './calendars.css';

export const Calendar = React.forwardRef(CalendarBase);

function CalendarBase<T extends DateValue>(
	props: AriaCalendarProps<T>,
	ref: React.Ref<HTMLDivElement>
) {
	const id = useId(props.id);
	const { locale } = useLocale();

	const calendarState = useCalendarState({
		...props,
		locale,
		createCalendar
	});

	const {
		calendarProps,
		title,
		nextButtonProps,
		prevButtonProps,
		errorMessageProps
	} = useCalendar(props, calendarState);

	return (
		<div data-component='calendar' ref={ref} {...calendarProps} id={id}>
			<CalendarHeader>
				<Button
					variant='unstyled'
					{...prevButtonProps}
					className='text-left p-2 leading-none'
				>
					<Icon icon='chevron-left' />
				</Button>
				<Title as='span'>{title}</Title>
				<Button
					variant='unstyled'
					{...nextButtonProps}
					className='text-right p-2 leading-none'
				>
					<Icon icon='chevron-right' />
				</Button>
			</CalendarHeader>
			<div {...errorMessageProps} />
			<CalendarGrid state={calendarState} />
		</div>
	);
}

type CalendarHeaderProps = ComponentPropsWithoutRef<'div'>;

function CalendarHeader({ children, ...props }: CalendarHeaderProps) {
	return (
		<div data-component='calendar-header' {...props}>
			{children}
		</div>
	);
}

type CalendarGridProps = {
	state: CalendarState;
};

function CalendarGrid({ state, ...props }: CalendarGridProps) {
	const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

	return (
		<table data-component='calendar-grid' {...gridProps}>
			<CalendarGridHeader {...headerProps}>
				<tr>
					{weekDays.map((day, index) => (
						<th key={index}>{day}</th>
					))}
				</tr>
			</CalendarGridHeader>
			<CalendarGridBody state={state} startDate={state.visibleRange.start} />
		</table>
	);
}

function CalendarGridHeader({ children, ...props }: any) {
	return (
		<thead data-component='calendar-grid-header' {...props}>
			{children}
		</thead>
	);
}

type CalendarGridBodyProps = {
	startDate: CalendarDate;
	state: CalendarState;
};

function CalendarGridBody({ startDate, state }: CalendarGridBodyProps) {
	const { locale } = useLocale();
	const weeksInMonth = getWeeksInMonth(startDate, locale);

	return (
		<tbody data-component='calendar-grid-body'>
			{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
				<tr key={weekIndex}>
					{state
						.getDatesInWeek(weekIndex, startDate)
						.map((date, i) =>
							date ? (
								<CalendarGridCell key={i} state={state} date={date} />
							) : (
								<td key={i}></td>
							)
						)}
				</tr>
			))}
		</tbody>
	);
}

type CalendarGridCellProps = AriaCalendarCellProps & {
	state: CalendarState;
};

function CalendarGridCell({ state, ...props }: CalendarGridCellProps) {
	const ref = useRef<HTMLDivElement>(null);
	const {
		cellProps,
		buttonProps,
		formattedDate,
		isSelected,
		isDisabled,
		isFocused,
		isOutsideVisibleRange,
		isInvalid,
		isPressed
	} = useCalendarCell(props, state, ref);

	const dataAttributes = {
		'data-selected': isSelected || undefined,
		'data-disabled': isDisabled || undefined,
		'data-focused': isFocused || undefined,
		'data-outside-range': isOutsideVisibleRange || undefined,
		'data-invalid': isInvalid || undefined,
		'data-pressed': isPressed || undefined
	};

	return (
		<td data-component='calendar-grid-cell' {...cellProps} {...dataAttributes}>
			<div ref={ref} {...buttonProps} hidden={isOutsideVisibleRange}>
				{formattedDate}
			</div>
		</td>
	);
}
