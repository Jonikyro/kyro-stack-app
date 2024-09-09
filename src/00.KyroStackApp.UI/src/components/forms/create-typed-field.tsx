import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RhfInput, RhfInputProps } from './rhf-elements/rhf-input';
import { RhfTextarea, RhfTextareaProps } from './rhf-elements/rhf-textarea';

type TypedInputProps<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfInputProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedInput<TFieldValues extends FieldValues>() {
	return RhfInput as TypedInputProps<TFieldValues>;
}

type TypedTextareaProps<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfTextareaProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedTextarea<TFieldValues extends FieldValues>() {
	return RhfTextarea as TypedTextareaProps<TFieldValues>;
}
