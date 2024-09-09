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
import { FieldDescription } from '../form-elements/field-description';
import { FieldErrorMessages } from '../form-elements/field-error-messages';
import { FormControl } from '../form-elements/form-control';
import { FormElement } from '../form-elements/form-element';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';
import { Textarea } from '../form-elements/textarea';

export type RhfTextareaProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	id?: string;
	label?: ReactNode;
	name: TFieldName;
	rows?: number;
	readOnly?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	description?: ReactNode;
	ariaLabel?: AriaAttributes['aria-label'];
	ariaDescribedBy?: AriaAttributes['aria-describedby'];
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfTextarea<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	rows,
	name,
	label,
	readOnly,
	disabled,
	autoFocus,
	description,
	ariaLabel,
	ariaDescribedBy,
	maxLength,
	...rest
}: RhfTextareaProps<TFieldValues, TFieldName>) {
	const { register, formState } = useFormContext<TFieldValues>();
	const error = get(formState.errors, name);

	const inputId = useId(id);
	const descriptionId = inputId + '-desc';
	const errorMessageId = inputId + '-err';

	const isRequired = Boolean(rest.required);
	const hasError = Boolean(error);
	const hasDescription = Boolean(description);

	return (
		<FormElement>
			{Boolean(label) && (
				<LabelContainer>
					<Label htmlFor={inputId}>{label}</Label>
				</LabelContainer>
			)}

			<FormControl>
				<Textarea
					id={inputId}
					rows={rows}
					maxLength={maxLength ? Number(maxLength) : undefined}
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
					{...register(name, rest)}
				/>
			</FormControl>
			{hasDescription && (
				<FieldDescription id={descriptionId}>{description}</FieldDescription>
			)}
			<FieldErrorMessages id={errorMessageId} error={error} />
		</FormElement>
	);
}
