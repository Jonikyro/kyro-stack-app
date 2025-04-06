import { Calendar } from '@/components/calendar/calendar';
import { Icon } from '@/components/icon/icon';
import { useId } from '@/utils/use-id';
import { parseDate } from '@internationalized/date';
import { CalendarPropsBase } from '@react-types/calendar';
import clsx from 'clsx';
import { AriaAttributes, ReactNode } from 'react';
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

export type RhfCalendarProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	id?: string;
	label?: ReactNode;
	name: TFieldName;
	readOnly?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	description?: ReactNode;
	hideMonthButtons?: boolean;
	ariaLabel?: AriaAttributes['aria-label'];
	ariaDescribedBy?: AriaAttributes['aria-describedby'];
} & UseControllerProps<TFieldValues, TFieldName> &
	Omit<
		CalendarPropsBase,
		| 'isDisabled'
		| 'isReadOnly'
		| 'isInvalid'
		| 'errorMessage'
		| 'validationState'
	>;

export function RhfCalendar<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	label,
	readOnly,
	disabled,
	autoFocus,
	description,
	ariaDescribedBy,
	ariaLabel,
	minValue,
	maxValue,
	hideMonthButtons,
	isDateUnavailable,
	focusedValue,
	defaultFocusedValue,
	onFocusChange,
	pageBehavior,
	...rest
}: RhfCalendarProps<TFieldValues, TFieldName>) {
	const calendarId = useId(id);
	const labelId = calendarId + '-label';
	const descriptionId = calendarId + '-desc';
	const errorMessageId = calendarId + '-err';
	const { field, fieldState } = useController<TFieldValues, TFieldName>(rest);

	const isRequired = Boolean(rest.rules?.required);
	const hasError = Boolean(fieldState.error);
	const hasDescription = Boolean(description);

	return (
		<FormElement>
			<LabelContainer className='flex items-center gap-[0.5ch]'>
				<Label>{label}</Label>
				{isRequired && (
					<Icon icon='asterisk' size='xs' className='text-error' />
				)}
			</LabelContainer>
			<Calendar
				id={calendarId}
				value={field.value ? parseDate(field.value) : null}
				onChange={(value) => field.onChange(value?.toString())}
				ref={field.ref}
				isReadOnly={readOnly}
				autoFocus={autoFocus}
				isDisabled={disabled}
				isInvalid={hasError}
				minValue={minValue}
				maxValue={maxValue}
				hideMonthButtons={hideMonthButtons}
				defaultFocusedValue={defaultFocusedValue}
				focusedValue={focusedValue}
				isDateUnavailable={isDateUnavailable}
				onFocusChange={onFocusChange}
				pageBehavior={pageBehavior}
				aria-label={ariaLabel}
				aria-labelledby={labelId}
				aria-describedby={
					clsx(
						hasDescription && descriptionId,
						hasError && errorMessageId,
						ariaDescribedBy
					) || undefined
				}
			/>
			{hasDescription && (
				<FieldDescription id={descriptionId}>{description}</FieldDescription>
			)}
			{hasError && (
				<FieldErrorMessages id={errorMessageId} error={fieldState.error} />
			)}
		</FormElement>
	);
}
