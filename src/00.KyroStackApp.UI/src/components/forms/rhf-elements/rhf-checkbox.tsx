import { useId } from '@/utils/use-id';
import clsx from 'clsx';
import { AriaAttributes, ReactNode } from 'react';
import {
	FieldPath,
	FieldValues,
	get,
	RegisterOptions,
	useFormContext
} from 'react-hook-form';
import { Checkbox } from '../form-elements/checkbox';
import { FieldDescription } from '../form-elements/field-description';
import { FieldErrorMessages } from '../form-elements/field-error-messages';
import { FormElement } from '../form-elements/form-element';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';

export type RhfCheckboxProps<
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
	ariaLabel?: AriaAttributes['aria-label'];
	ariaDescribedBy?: AriaAttributes['aria-describedby'];
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfCheckbox<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	name,
	label,
	readOnly,
	disabled,
	autoFocus,
	description,
	ariaLabel,
	ariaDescribedBy,
	...registerOptions
}: RhfCheckboxProps<TFieldValues, TFieldName>) {
	const { register, formState } = useFormContext<TFieldValues>();
	const error = get(formState.errors, name);

	const inputId = useId(id);
	const descriptionId = inputId + '-desc';
	const errorMessageId = inputId + '-err';

	const isRequired = Boolean(registerOptions.required);
	const hasError = Boolean(error);
	const hasDescription = Boolean(description);

	return (
		<FormElement className='grid grid-cols-[auto,1fr] items-center gap-x-[1ch]'>
			<Checkbox
				id={inputId}
				readOnly={readOnly}
				disabled={disabled}
				autoFocus={autoFocus}
				aria-label={ariaLabel}
				aria-invalid={hasError}
				aria-required={isRequired}
				aria-describedby={
					clsx(
						hasDescription && descriptionId,
						hasError && errorMessageId,
						ariaDescribedBy
					) || undefined
				}
				{...register(name, registerOptions)}
			/>

			<LabelContainer>
				<Label htmlFor={inputId}>{label}</Label>
			</LabelContainer>

			{hasDescription && (
				<FieldDescription id={descriptionId} className='col-start-2'>
					{description}
				</FieldDescription>
			)}

			<FieldErrorMessages
				id={errorMessageId}
				error={error}
				className='col-start-2'
			/>
		</FormElement>
	);
}
