import { useId } from '@/utils/use-id';
import {
	FieldPath,
	FieldValues,
	RegisterOptions,
	useFormContext
} from 'react-hook-form';
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
	label?: string;
	name: TFieldName;
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfInput<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ id, name, label, ...rest }: RhfInputProps<TFieldValues, TFieldName>) {
	const { register } = useFormContext<TFieldValues>();
	const inputId = useId(id);
	const required = Boolean(rest.required);

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
					aria-required={required}
					{...register(name, rest)}
				/>
			</FormControl>
		</FormElement>
	);
}
