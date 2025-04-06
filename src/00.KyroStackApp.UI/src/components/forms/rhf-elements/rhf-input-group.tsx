import { useId } from '@/utils/use-id';
import { createContext, ReactNode } from 'react';
import {
	FieldError,
	FieldPath,
	FieldValues,
	get,
	PathValue,
	RegisterOptions,
	useFormContext,
	useWatch
} from 'react-hook-form';
import { InputGroup } from '../form-elements/input-group';

export type RhfInputGroupProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TFieldName;
	label: ReactNode;
	children?: ReactNode;
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfInputGroup<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	name,
	label,
	children,
	...registerOptions
}: RhfInputGroupProps<TFieldValues, TFieldName>) {
	const { formState } = useFormContext<TFieldValues>();
	const error = get(formState.errors, name);
	const errorId = useId();

	const value = useWatch<TFieldValues>({ name });

	const contextValue = {
		name,
		registerOptions: registerOptions as RegisterOptions<FieldValues>,
		currentValue: value,
		error,
		errorId
	};

	return (
		<InputGroup label={label}>
			<RhfInputGroupContextProvider value={contextValue}>
				{children}
			</RhfInputGroupContextProvider>
		</InputGroup>
	);
}

export const RhfInputGroupContext = createContext<
	RhfInputGroupContextProviderProps['value'] | null
>(null);

type RhfInputGroupContextProviderProps = {
	children: ReactNode;
	value: {
		name: FieldPath<FieldValues>;
		currentValue: PathValue<FieldValues, string>;
		registerOptions: RegisterOptions<FieldValues>;
		error?: FieldError;
		errorId: string;
	};
};

function RhfInputGroupContextProvider({
	value,
	children
}: RhfInputGroupContextProviderProps) {
	return (
		<RhfInputGroupContext.Provider value={value}>
			{children}
		</RhfInputGroupContext.Provider>
	);
}
