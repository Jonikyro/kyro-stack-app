import { useId } from '@/utils/use-id';
import { AriaAttributes, ReactNode } from 'react';
import {
	FieldPath,
	FieldValues,
	get,
	RegisterOptions,
	useFormContext,
	UseFormRegisterReturn
} from 'react-hook-form';

interface GetInputPropsProps<TFieldName extends string>
	extends UseFormRegisterReturn<TFieldName> {
	id: string;
	'aria-required': AriaAttributes['aria-required'];
	'aria-invalid': AriaAttributes['aria-invalid'];
}

export interface RhfFieldRenderProps<TFieldName extends string> {
	getInputProps: () => GetInputPropsProps<TFieldName>;
	htmlFor: string;
}

export type RhfFieldProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	id?: string;
	name: TFieldName;
	required?: boolean;
	children?: (props: RhfFieldRenderProps<TFieldName>) => ReactNode;
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfField<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	name,
	children,
	...registerOptions
}: RhfFieldProps<TFieldValues, TFieldName>) {
	const { register, formState } = useFormContext<TFieldValues>();
	const error = get(formState.errors, name);

	const inputId = useId(id);

	const getInputProps = () => ({
		id: inputId,
		'aria-required': Boolean(registerOptions.required),
		'aria-invalid': Boolean(error),
		...register(name, registerOptions)
	});

	return <>{children?.({ getInputProps, htmlFor: inputId })}</>;
}
