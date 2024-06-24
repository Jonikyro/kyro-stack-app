import React, { Ref, forwardRef, useMemo } from 'react';
import { type FieldError } from 'react-hook-form';
import './forms.css';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export function FormGroup({ children, ...rest }: DivProps) {
	return (
		<div data-component='form-group' {...rest}>
			{children}
		</div>
	);
}

function FormElementBase(
	{ children, ...rest }: DivProps,
	ref: Ref<HTMLDivElement>
) {
	return (
		<div ref={ref} data-component='form-element' {...rest}>
			{children}
		</div>
	);
}
export const FormElement = forwardRef(FormElementBase);

export function LabelContainer({ children, ...rest }: DivProps) {
	return (
		<div data-component='label-container' {...rest}>
			{children}
		</div>
	);
}

type LabelProps = React.ComponentPropsWithoutRef<'label'>;

export function Label({ children, ...rest }: LabelProps) {
	return (
		<label data-component='form-label' {...rest}>
			{children}
		</label>
	);
}

function FormControlBase(
	{ children, ...rest }: DivProps,
	ref: Ref<HTMLDivElement>
) {
	return (
		<div ref={ref} data-component='form-control' {...rest}>
			{children}
		</div>
	);
}
export const FormControl = forwardRef(FormControlBase);

type InputFixProps = LabelProps & {
	htmlFor: string;
};

/**
 * Component that represents a prefix or suffix for an input-element.
 */
export function InputFix({ children, ...rest }: InputFixProps) {
	return (
		<label aria-hidden='true' data-component='input-fix' {...rest}>
			{children}
		</label>
	);
}

type InputProps = React.ComponentPropsWithoutRef<'input'>;

function InputBase(
	props: InputProps,
	ref: React.ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			autoComplete='off'
			data-component='form-input'
			ref={ref}
			{...props}
		/>
	);
}
export const Input = forwardRef(InputBase);

export function FieldDescription({ children, ...rest }: DivProps) {
	return (
		<span data-component='field-description' {...rest}>
			{children}
		</span>
	);
}

type FieldErrorsProps = Omit<DivProps, 'children'> & {
	error?: FieldError;
};

export function FieldErrors({ error, ...rest }: FieldErrorsProps) {
	const hasMultipleErrors = useMemo(
		() => error && Array.isArray(error.types),
		[error]
	);

	if (!error) return null;

	if (hasMultipleErrors) {
		return (
			<div data-component='field-errors' {...rest}>
				<ul>
					{Object.entries(error!.message!).map(([type, message]) => (
						<li key={type}>
							<ErrorMessage>{message}</ErrorMessage>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div data-component='field-errors' {...rest}>
			<ErrorMessage>{error?.message}</ErrorMessage>
		</div>
	);
}

function ErrorMessage({ children, ...rest }: DivProps) {
	if (!children) return null;

	return (
		<span data-component='error-message' {...rest}>
			{children}
		</span>
	);
}
