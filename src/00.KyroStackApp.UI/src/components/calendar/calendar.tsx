import { useId } from '@/utils/use-id';
import { createCalendar, getWeeksInMonth } from '@internationalized/date';
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	useRef
} from 'react';
import {
	AriaButtonProps,
	AriaCalendarCellProps,
	AriaCalendarGridProps,
	AriaCalendarProps,
	DateValue,
	useButton,
	useCalendar,
	useCalendarCell,
	useCalendarGrid,
	useLocale
} from 'react-aria';
import { CalendarState, useCalendarState } from 'react-stately';
import { Button } from '../button/button';
import { ErrorMessage } from '../forms/form-elements/field-error-messages';
import { Icon } from '../icon/icon';
import { T } from '../text/t';
import './calendar.css';

export type CalendarProps<T extends DateValue> = AriaCalendarProps<T> & {
	className?: string;
	hideMonthButtons?: boolean;
};

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
	{ className, isInvalid, hideMonthButtons, ...rest }: CalendarProps<T>,
	ref: ForwardedRef<HTMLDivElement>
) {
	const id = useId(rest.id);
	const { locale } = useLocale();

	const calendarState = useCalendarState({
		...rest,
		locale,
		createCalendar
	});

	const {
		title,
		calendarProps,
		nextButtonProps,
		prevButtonProps,
		errorMessageProps
	} = useCalendar(rest, calendarState);

	return (
		<div
			id={id}
			className={className}
			data-component='calendar'
			data-invalid={isInvalid}
			tabIndex={-1}
			ref={ref}
			{...calendarProps}
		>
			<CalendarHeader>
				{!hideMonthButtons && (
					<AriaButton {...prevButtonProps} type='button'>
						<Icon icon='chevron-left' />
					</AriaButton>
				)}
				<T className='mx-auto'>{title}</T>
				{!hideMonthButtons && (
					<AriaButton {...nextButtonProps} type='button'>
						<Icon icon='chevron-right' />
					</AriaButton>
				)}
			</CalendarHeader>
			<CalendarGrid state={calendarState} />
			<div {...errorMessageProps}>
				<ErrorMessage>{rest.errorMessage}</ErrorMessage>
			</div>
		</div>
	);
});

function CalendarHeader(props: ComponentPropsWithoutRef<'div'>) {
	return <header data-component='calendar-header' {...props} />;
}

type CalendarGridProps = AriaCalendarGridProps & {
	state: CalendarState;
};

function CalendarGrid({ state, ...rest }: CalendarGridProps) {
	const { locale } = useLocale();
	const { gridProps, headerProps, weekDays } = useCalendarGrid(rest, state);
	const startDate = state.visibleRange.start;
	const weeksInMonth = getWeeksInMonth(startDate, locale);

	return (
		<table data-component='calendar-grid' {...gridProps}>
			<thead {...headerProps}>
				<tr>
					{weekDays.map((day, index) => (
						<th key={index}>{day}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
					<tr key={weekIndex}>
						{state
							.getDatesInWeek(weekIndex, startDate)
							.map((date, dayIndex) =>
								date ? (
									<CalendarCell state={state} date={date} key={dayIndex} />
								) : (
									<td key={dayIndex} />
								)
							)}
					</tr>
				))}
			</tbody>
		</table>
	);
}

type CalendarCellProps = AriaCalendarCellProps & {
	state: CalendarState;
};

function CalendarCell({ state, ...rest }: CalendarCellProps) {
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
	} = useCalendarCell(rest, state, ref);

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
			<div ref={ref} {...buttonProps}>
				{formattedDate}
			</div>
		</td>
	);
}

type ReactAriaButtonProps = AriaButtonProps;

function AriaButton({ children, ...rest }: ReactAriaButtonProps) {
	const ref = useRef<HTMLButtonElement | null>(null);
	const { buttonProps, isPressed } = useButton(
		{ ...rest, preventFocusOnPress: true },
		ref
	);

	return (
		<Button {...buttonProps} data-is-pressed={isPressed}>
			{children}
		</Button>
	);
}
