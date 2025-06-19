import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, useContext } from 'react';
import { FieldErrorMessages } from '../form-elements/field-error-messages';
import { RhfRadioGroupContext } from './rhf-radio-group';

export type RhfRadioErrorProps = Omit<
	ComponentPropsWithoutRef<typeof FieldErrorMessages>,
	'id' | 'error'
>;

export function RhfRadioError({ className, ...rest }: RhfRadioErrorProps) {
	const radioContext = useContext(RhfRadioGroupContext);

	if (!radioContext)
		throw Error('RhfRadioError needs to be a child of RhfRadioGroup');

	const { errorId, error } = radioContext;

	if (!error) return null;

	return (
		<div className='grid grid-cols-[auto_1fr] items-center gap-x-[1ch]'>
			<div aria-hidden className='h-6 w-6' />
			<FieldErrorMessages
				id={errorId}
				error={error}
				className={cn('col-start-2', className)}
				{...rest}
			/>
		</div>
	);
}
