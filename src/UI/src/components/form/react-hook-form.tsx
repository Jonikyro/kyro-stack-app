import { useId } from '@/utils/use-id';
import clsx from 'clsx';
import React, {
	AriaAttributes,
	forwardRef,
	useCallback,
	useContext,
	useMemo
} from 'react';
import {
	FormProvider,
	SubmitHandler,
	UseFormReturn,
	get,
	useFormContext,
	type FieldError,
	type FieldValues,
	type Path,
	type RegisterOptions,
	type UseFormRegisterReturn
} from 'react-hook-form';

/**
 * @file This file contains the glue between react-hook-form and our form components.
 */

type LabelProps = {
	htmlFor: string;
	required: boolean;
};

type InputProps = {
	id: string;
	'aria-describedby': AriaAttributes['aria-describedby'];
	'aria-invalid': AriaAttributes['aria-invalid'];
	'aria-required': AriaAttributes['aria-required'];
};

type FieldRenderProps = {
	descriptionId: string;
	error: FieldError;
	errored: boolean;
	errorId: string;
	inputId: string;
	required: boolean;
	getLabelProps: () => Prettify<LabelProps>;
	getInputProps: (
		describedBy?: string
	) => Prettify<InputProps & UseFormRegisterReturn>;
};

type FieldProps<T extends FieldValues> = {
	id?: string;
	name: Path<T>;
	children: (props: FieldRenderProps) => React.ReactNode;
} & RegisterOptions<T>;

export function useField<T extends FieldValues>() {
	return Field as typeof Field<T>;
}

function Field<T extends FieldValues>({
	id,
	name,
	children,
	...rest
}: FieldProps<T>) {
	const { register, formState } = useFormContext<T>();

	const inputId = useId(id);

	const error = get(formState.errors, name) as FieldError;
	const errored = !!error;
	const errorId = useMemo(() => `${inputId}-error`, [inputId]);
	const descriptionId = useMemo(() => `${inputId}-description`, [inputId]);

	const required = !!rest?.required;

	const getInputProps = useCallback(
		(describedBy?: string): ReturnType<FieldRenderProps['getInputProps']> => ({
			id: inputId,
			'aria-describedby': clsx(errored && errorId, describedBy) || undefined,
			'aria-invalid': errored ? 'true' : undefined,
			'aria-required': required ? 'true' : undefined,
			...register(name, rest)
		}),
		[errorId, errored, inputId, name, register, required, rest]
	);

	const getLabelProps = useCallback(
		(): ReturnType<FieldRenderProps['getLabelProps']> => ({
			htmlFor: inputId,
			required: !!required
		}),
		[inputId, required]
	);

	return children({
		descriptionId,
		error,
		errored,
		errorId,
		inputId,
		required,
		getLabelProps,
		getInputProps
	});
}

type FormProps<T extends Record<string, any>> = UseFormReturn<T> & {
	'aria-describedby'?: AriaAttributes['aria-describedby'];
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	id?: string;
	onSubmit: SubmitHandler<Prettify<T>>;
};

function FormBase<T extends Record<string, any>>(
	{
		'aria-describedby': ariaDescribedBy,
		children,
		className,
		disabled = false,
		id,
		onSubmit,
		...methods
	}: FormProps<T>,
	ref: React.ForwardedRef<HTMLFormElement>
) {
	const formId = useId(id);

	return (
		<form
			aria-describedby={ariaDescribedBy}
			className={className}
			data-component='form'
			id={formId}
			noValidate
			onSubmit={methods.handleSubmit(onSubmit)}
			ref={ref}
		>
			<FormIdProvider id={formId}>
				<fieldset disabled={disabled}>
					<FormDisabledStateProvider disabled={disabled}>
						<FormProvider {...methods}>{children}</FormProvider>
					</FormDisabledStateProvider>
				</fieldset>
			</FormIdProvider>
		</form>
	);
}

export const Form = forwardRef(FormBase);

const FormDisabledContext = React.createContext(false);
const FormIdContext = React.createContext<string | undefined>(undefined);

function FormDisabledStateProvider({
	children,
	disabled
}: {
	children: React.ReactNode;
	disabled: boolean;
}) {
	return (
		<FormDisabledContext.Provider value={disabled}>
			{children}
		</FormDisabledContext.Provider>
	);
}

function FormIdProvider({
	children,
	id
}: {
	children: React.ReactNode;
	id: string | undefined;
}) {
	return <FormIdContext.Provider value={id}>{children}</FormIdContext.Provider>;
}

export function useIsFormDisabled() {
	const isDisabled = useContext(FormDisabledContext);
	if (isDisabled === undefined) {
		throw new Error('useIsFormDisabled must be used within a `<Form />`');
	}
	return isDisabled;
}

export function useFormId() {
	const id = useContext(FormIdContext);
	if (id === undefined) {
		throw new Error('useFormId must be used within a `<Form />`');
	}
	return id;
}
