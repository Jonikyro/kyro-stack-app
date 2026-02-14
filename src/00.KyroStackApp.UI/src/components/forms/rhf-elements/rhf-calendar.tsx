import { Calendar } from '@/components/calendar/calendar';
import { Icon } from '@/components/icon/icon';
import { useId } from '@/utils/use-id';
import { CalendarDate, DateValue, parseDate } from '@internationalized/date';
import { PageBehavior } from '@react-types/calendar';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
	FieldPath,
	FieldValues,
	useController,
	UseControllerProps
} from 'react-hook-form';
import { FieldDescription } from '../form-elements/field-description';
import { FieldErrorMessages } from '../form-elements/field-error-messages';
import { FormElement } from '../form-elements/form-element';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';

interface RhfCalendarPropsInternal<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName> {
	id?: string;
	label?: ReactNode;
	name: TFieldName;
	readOnly?: boolean;
	autoFocus?: boolean;
	description?: ReactNode;
	hideMonthButtons?: boolean;

	// React aria props
	minValue?: DateValue | null;
	maxValue?: DateValue | null;
	isDateUnavailable?: ((date: DateValue) => boolean) | undefined;
	focusedValue?: DateValue;
	defaultFocusedValue?: DateValue;
	onFocusChange?: (date: CalendarDate) => void;
	pageBehavior?: PageBehavior;
}

export type RhfCalendarProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Override<
	ComponentPropsWithoutRef<'div'>,
	RhfCalendarPropsInternal<TFieldValues, TFieldName>
>;

export function RhfCalendar<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: RhfCalendarProps<TFieldValues, TFieldName>) {
	const calendarId = useId(props.id);
	const labelId = calendarId + '-label';
	const descriptionId = calendarId + '-desc';
	const errorMessageId = calendarId + '-err';
	const { field, fieldState } = useController<TFieldValues, TFieldName>(props);

	const isRequired = Boolean(props.rules?.required);
	const hasError = Boolean(fieldState.error);
	const hasDescription = Boolean(props.description);

	return (
		<FormElement>
			{Boolean(props.label) && (
				<LabelContainer className='flex items-center gap-[0.5ch]'>
					<Label htmlFor={calendarId}>{props.label}</Label>
					{isRequired && (
						<Icon icon='asterisk' size='xs' className='text-error' />
					)}
				</LabelContainer>
			)}

			<Calendar
				{...props}
				id={calendarId}
				value={field.value ? parseDate(field.value) : null}
				onChange={(value) => field.onChange(value?.toString())}
				ref={field.ref}
				isReadOnly={props.readOnly}
				isDisabled={props.disabled}
				isInvalid={hasError}
				aria-labelledby={labelId}
				aria-describedby={
					clsx(
						hasDescription && descriptionId,
						hasError && errorMessageId,
						props['aria-describedby']
					) || undefined
				}
			/>
			{hasDescription && (
				<FieldDescription id={descriptionId}>
					{props.description}
				</FieldDescription>
			)}
			{hasError && (
				<FieldErrorMessages id={errorMessageId} error={fieldState.error} />
			)}
		</FormElement>
	);
}
