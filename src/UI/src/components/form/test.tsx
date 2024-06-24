import { useForm } from 'react-hook-form';
import { Icon } from '../icon';
import {
	FieldDescription,
	FieldErrors,
	FormControl,
	FormElement,
	FormGroup,
	Input,
	InputFix,
	Label,
	LabelContainer
} from './form-ui';
import { Form, useField } from './react-hook-form';

type FormFields = {
	firstname: string;
	lastname: string;
	email: string;
};

export function Test() {
	const Field = useField<FormFields>();
	const methods = useForm<FormFields>();

	return (
		<Form<FormFields>
			{...methods}
			onSubmit={(data) => console.log(data)}
			className='max-w-[20ch]'
		>
			<FormGroup>
				<Field
					name='email'
					required='Pakollinen'
					minLength={{ value: 10, message: 'Liian lyhyt' }}
					maxLength={{ value: 5, message: 'Liian pitkä' }}
				>
					{({
						getInputProps,
						getLabelProps,
						inputId,
						error,
						errorId,
						required
					}) => (
						<FormElement className='text-base'>
							<LabelContainer>
								<Label className='text-ellipsis' {...getLabelProps()}>
									Labllllllllllllllllllllllllllllllllllllllllllllllllel
								</Label>
								{required && (
									<Icon
										size='font-3/4'
										icon='asterisk'
										className='text-red-600'
									/>
								)}
							</LabelContainer>
							<FormControl>
								<InputFix htmlFor={inputId}>@</InputFix>
								<Input {...getInputProps()} />
								{/* <InputFix htmlFor={inputId} className='bg-yellow-500'>
									<Icon className='text-[var(--color-secondary)]' icon='bag' />
								</InputFix> */}
							</FormControl>
							<FieldDescription>Help</FieldDescription>
							<FieldErrors id={errorId} error={error} />
						</FormElement>
					)}
				</Field>
			</FormGroup>
			<button type='submit'>Submit</button>
		</Form>
	);
}
