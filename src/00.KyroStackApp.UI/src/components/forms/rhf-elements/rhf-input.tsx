import { useId } from '@/utils/use-id';
import clsx from 'clsx';
import {
	AriaAttributes,
	HTMLAttributes,
	HTMLInputTypeAttribute,
	ReactNode
} from 'react';
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
import { Input } from '../form-elements/input';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';

export type RhfInputProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	id?: string;
	label?: ReactNode;
	name: TFieldName;
	type?: HTMLInputTypeAttribute;
	list?: string;
	readOnly?: boolean;
	disabled?: boolean;
	inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
	autoFocus?: boolean;
	description?: ReactNode;
	ariaLabel?: AriaAttributes['aria-label'];
	ariaDescribedBy?: AriaAttributes['aria-describedby'];
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfInput<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	name,
	label,
	type,
	list,
	readOnly,
	disabled,
	inputMode,
	autoFocus,
	description,
	ariaLabel,
	ariaDescribedBy,
	...rest
}: RhfInputProps<TFieldValues, TFieldName>) {
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
				<Input
					id={inputId}
					type={type}
					list={list}
					readOnly={readOnly}
					disabled={disabled}
					autoFocus={autoFocus}
					inputMode={inputMode}
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
