import { Icon } from '@/components/icon/icon';
import { useId } from '@/utils/use-id';
import { parseDate } from '@internationalized/date';
import { ReactNode } from 'react';
import { DateValue } from 'react-aria';
import {
	FieldPath,
	FieldValues,
	useController,
	UseControllerProps
} from 'react-hook-form';
import { DateField, DateFieldProps } from '../date-field/date-field';
import { FieldDescription } from '../form-elements/field-description';
import { FieldErrorMessages } from '../form-elements/field-error-messages';
import { FormElement } from '../form-elements/form-element';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';

/* eslint-disable react-hooks/refs */

export interface RhfDateFieldProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TFieldName>,
		Omit<
			DateFieldProps<DateValue>,
			| 'defaultValue'
			| 'isDisabled'
			| 'isReadOnly'
			| 'isInvalid'
			| 'isDisabled'
			| 'onBlur'
			| 'onChange'
		> {
	id?: string;
	label?: ReactNode;
	name: TFieldName;
	readOnly?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	description?: ReactNode;
}

export function RhfDateField<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: RhfDateFieldProps<TFieldValues, TFieldName>) {
	const inputId = useId(props.id);
	const labelId = inputId + '-label';
	const descriptionId = inputId + '-desc';
	const errorMessageId = inputId + '-err';
	const { field, fieldState } = useController<TFieldValues, TFieldName>(props);

	const isRequired = Boolean(props.rules?.required);
	const hasError = Boolean(fieldState.error);
	const hasDescription = Boolean(props.description);

	return (
		<FormElement>
			{Boolean(props.label) && (
				<LabelContainer className='flex items-center gap-[0.5ch]'>
					<Label htmlFor={inputId}>{props.label}</Label>
					{isRequired && (
						<Icon icon='asterisk' size='xs' className='text-error' />
					)}
				</LabelContainer>
			)}

			<DateField
				{...props}
				id={inputId}
				ref={field.ref}
				onBlur={field.onBlur}
				value={field.value ? parseDate(field.value) : null}
				onChange={(value) => field.onChange(value?.toString())}
				aria-labelledby={labelId}
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
