import { useId } from '@/utils/use-id';
import clsx from 'clsx';
import { AriaAttributes, ReactNode, useContext } from 'react';
import {
	FieldPath,
	FieldValues,
	RegisterOptions,
	useFormContext
} from 'react-hook-form';
import { FieldDescription } from '../form-elements/field-description';
import { FormElement } from '../form-elements/form-element';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';
import { RadioButton } from '../form-elements/radio-button';
import { RhfRadioGroupContext } from './rhf-radio-group';

export type RhfRadioButtonProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues>
> = {
	id?: string;
	name: TFieldName;
	label?: ReactNode;
	readOnly?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	description?: ReactNode;
	ariaLabel?: AriaAttributes['aria-label'];
	ariaDescribedBy?: AriaAttributes['aria-describedby'];
} & Pick<RegisterOptions<TFieldValues, TFieldName>, 'value'>;

export function RhfRadioButton<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	label,
	value,
	readOnly,
	disabled,
	autoFocus,
	description,
	ariaLabel,
	ariaDescribedBy
}: RhfRadioButtonProps<TFieldValues, TFieldName>) {
	const { register } = useFormContext<TFieldValues>();
	const radioContext = useContext(RhfRadioGroupContext);

	if (!radioContext)
		throw Error('RhfRadioButton needs to be a child of RhfRadioGroup');

	const { name, currentValue, registerOptions, errorId, error } = radioContext;

	const inputId = useId(id);
	const descriptionId = inputId + '-desc';

	const isRequired = Boolean(registerOptions.required);
	const hasError = Boolean(error);
	const hasDescription = Boolean(description);

	return (
		<FormElement className='my-[1ch] grid grid-cols-[auto,1fr] items-center gap-x-[1ch]'>
			<RadioButton
				id={inputId}
				readOnly={readOnly}
				disabled={disabled}
				autoFocus={autoFocus}
				value={value}
				aria-label={ariaLabel}
				aria-invalid={hasError && (!currentValue || currentValue === value)}
				aria-required={isRequired}
				aria-describedby={
					clsx(
						hasDescription && descriptionId,
						hasError && errorId,
						ariaDescribedBy
					) || undefined
				}
				{...register(
					name as FieldPath<TFieldValues>,
					registerOptions as RegisterOptions<TFieldValues>
				)}
			/>

			<LabelContainer>
				<Label htmlFor={inputId}>{label}</Label>
			</LabelContainer>

			{hasDescription && (
				<FieldDescription id={descriptionId} className='col-start-2'>
					{description}
				</FieldDescription>
			)}
		</FormElement>
	);
}
