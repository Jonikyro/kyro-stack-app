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
import { RadioGroup } from '../form-elements/radio-group';

export type RhfRadioGroupProps<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TFieldName;
	label: ReactNode;
	children?: ReactNode;
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfRadioGroup<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	name,
	label,
	children,
	...registerOptions
}: RhfRadioGroupProps<TFieldValues, TFieldName>) {
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
		<RadioGroup label={label}>
			<RhfRadioContextProvider value={contextValue}>
				{children}
			</RhfRadioContextProvider>
		</RadioGroup>
	);
}

export const RhfRadioGroupContext = createContext<
	RhfRadioContextProviderProps['value'] | null
>(null);

type RhfRadioContextProviderProps = {
	children: ReactNode;
	value: {
		name: FieldPath<FieldValues>;
		currentValue: PathValue<FieldValues, string>;
		registerOptions: RegisterOptions<FieldValues>;
		error?: FieldError;
		errorId: string;
	};
};

function RhfRadioContextProvider({
	value,
	children
}: RhfRadioContextProviderProps) {
	return (
		<RhfRadioGroupContext.Provider value={value}>
			{children}
		</RhfRadioGroupContext.Provider>
	);
}
