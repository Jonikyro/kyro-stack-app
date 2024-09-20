import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RhfCheckbox, RhfCheckboxProps } from './rhf-elements/rhf-checkbox';
import { RhfField, RhfFieldProps } from './rhf-elements/rhf-field';
import { RhfInput, RhfInputProps } from './rhf-elements/rhf-input';
import {
	RhfRadioButton,
	RhfRadioButtonProps
} from './rhf-elements/rhf-radio-button';
import { RhfRadioError } from './rhf-elements/rhf-radio-error';
import {
	RhfRadioGroup,
	RhfRadioGroupProps
} from './rhf-elements/rhf-radio-group';
import { RhfTextarea, RhfTextareaProps } from './rhf-elements/rhf-textarea';

/* Typed Field */

type TypedFieldComponent<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfFieldProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedField<TFieldValues extends FieldValues>() {
	return RhfField as TypedFieldComponent<TFieldValues>;
}

/* Typed Input (text) */

type TypedInputComponent<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfInputProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedInput<TFieldValues extends FieldValues>() {
	return RhfInput as TypedInputComponent<TFieldValues>;
}

/* Typed Textarea */

type TypedTextareaComponent<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfTextareaProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedTextarea<TFieldValues extends FieldValues>() {
	return RhfTextarea as TypedTextareaComponent<TFieldValues>;
}

/* Typed Checkbox */

type TypedCheckboxComponent<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfCheckboxProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedCheckbox<TFieldValues extends FieldValues>() {
	return RhfCheckbox as TypedCheckboxComponent<TFieldValues>;
}

/* Typed RadioButton */

type TypedRadioButtonComponent<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfRadioButtonProps<TFieldValues, TFieldName>
) => ReactNode;

type TypedRadioGroupComponent<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfRadioGroupProps<TFieldValues, TFieldName>
) => ReactNode;

// eslint-disable-next-line react-refresh/only-export-components
const Radio = {
	Group: RhfRadioGroup,
	Button: RhfRadioButton,
	Error: RhfRadioError
};

export function createTypedRadio<TFieldValues extends FieldValues>() {
	return Radio as {
		Button: TypedRadioButtonComponent<TFieldValues>;
		Group: TypedRadioGroupComponent<TFieldValues>;
		Error: typeof RhfRadioError;
	};
}
