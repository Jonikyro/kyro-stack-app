import { Icon } from '@/components/icon/icon';
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
import { InputFix } from '../form-elements/input-fix';
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
	prefix?: ReactNode;
	suffix?: ReactNode;
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
	prefix,
	suffix,
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
				<LabelContainer className='flex items-center gap-[0.5ch]'>
					<Label htmlFor={inputId}>{label}</Label>
					{isRequired && (
						<Icon icon='asterisk' size='xs' className='text-error' />
					)}
				</LabelContainer>
			)}

			<FormControl
				className={clsx(
					hasError && 'border-error outline-error focus-within:border-error'
				)}
			>
				{Boolean(prefix) && <InputFix inputId={inputId}>{prefix}</InputFix>}
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
				{Boolean(suffix) && <InputFix inputId={inputId}>{suffix}</InputFix>}
			</FormControl>
			{hasDescription && (
				<FieldDescription id={descriptionId}>{description}</FieldDescription>
			)}
			<FieldErrorMessages id={errorMessageId} error={error} />
		</FormElement>
	);
}
