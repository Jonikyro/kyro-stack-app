import { useId } from '@/utils/use-id';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import {
	FieldValues,
	FormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn
} from 'react-hook-form';

export type RhfFormProps<TFieldValues extends FieldValues> = {
	id?: string;
	noValidate?: boolean;
	autoComplete?: string;
	children?: ReactNode;
	disabled?: boolean;
	method?: string;
	onSubmit: SubmitHandler<TFieldValues>;
	onInvalid?: SubmitErrorHandler<TFieldValues>;
} & UseFormReturn<TFieldValues>;

export const RhfForm = forwardRef(function RhfForm<
	TFieldValues extends FieldValues
>(
	{
		id,
		noValidate,
		autoComplete,
		disabled,
		children,
		onSubmit,
		onInvalid,
		method,
		...methods
	}: RhfFormProps<TFieldValues>,
	ref: ForwardedRef<HTMLFormElement>
) {
	const _id = useId(id);

	return (
		<form
			id={_id}
			noValidate={noValidate ?? true}
			autoComplete={autoComplete ?? 'off'}
			ref={ref}
			onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
			data-component='rhf-form'
			method={method}
		>
			<fieldset disabled={disabled} className='m-0 block border-none p-0'>
				<FormProvider {...methods}>{children}</FormProvider>
			</fieldset>
		</form>
	);
});
