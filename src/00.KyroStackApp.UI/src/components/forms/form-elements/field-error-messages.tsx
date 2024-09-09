import { ComponentPropsWithRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type FieldErrorMessagesProps = {
	id: string;
	error?: FieldError;
} & ComponentPropsWithRef<'div'>;

export function FieldErrorMessages({
	id,
	error,
	...rest
}: FieldErrorMessagesProps) {
	if (!error) {
		return null;
	}

	const containsMultipleErrors = Array.isArray(error?.types);

	if (containsMultipleErrors) {
		return (
			<div id={id} data-component='field-error-messages' {...rest}>
				<ul>
					{Object.entries(error.types!).map(([type, errorMessage]) => (
						<li key={type}>
							<ErrorMessage>{errorMessage}</ErrorMessage>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div id={id} data-component='field-error-messages' {...rest}>
			<ErrorMessage>{error.message}</ErrorMessage>
		</div>
	);
}

type ErrorMessageProps = {
	children: ReactNode;
};

function ErrorMessage({ children }: ErrorMessageProps) {
	return (
		<span
			data-component='error-message'
			className='whitespace-normal text-sm text-error'
			children={children}
		/>
	);
}
