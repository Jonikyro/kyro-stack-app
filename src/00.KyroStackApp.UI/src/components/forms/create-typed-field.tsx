import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RhfInput, RhfInputProps } from './rhf-elements/rhf-input';

type TypedInputProps<TFieldValues extends FieldValues> = <
	TFieldName extends FieldPath<TFieldValues>
>(
	props: RhfInputProps<TFieldValues, TFieldName>
) => ReactNode;

export function createTypedInput<TFieldValues extends FieldValues>() {
	return RhfInput as TypedInputProps<TFieldValues>;
}
