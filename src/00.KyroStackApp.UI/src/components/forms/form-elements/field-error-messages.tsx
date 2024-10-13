import { T } from '@/components/text/t';
import { cn } from '@/utils/cn';
import { ComponentPropsWithRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type FieldErrorMessagesProps = {
	id: string;
	error?: FieldError;
} & ComponentPropsWithRef<'div'>;

export function FieldErrorMessages({
	id,
	error,
	className,
	...rest
}: FieldErrorMessagesProps) {
	if (!error) {
		return null;
	}

	const containsMultipleErrors = Array.isArray(error?.types);

	if (containsMultipleErrors) {
		return (
			<div
				id={id}
				data-component='field-error-messages'
				className={cn('leading-4', className)}
				{...rest}
			>
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
		<div
			id={id}
			data-component='field-error-messages'
			className={cn('leading-4', className)}
			{...rest}
		>
			<ErrorMessage>{error.message}</ErrorMessage>
		</div>
	);
}

type ErrorMessageProps = {
	children: ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
	return <T className='whitespace-normal text-sm text-error'>{children}</T>;
}
