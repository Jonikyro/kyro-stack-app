import * as Tooltip from '@/components/tooltip/tooltip';
import { useForm } from 'react-hook-form';
import { Icon } from '../icon';
import { Combobox } from '../list-selectors/combobox';
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

const books = [
	{ id: 'book-1', author: 'Harper Lee', title: 'To Kill a Mockingbird' },
	{ id: 'book-2', author: 'Lev Tolstoy', title: 'War and Peace' },
	{ id: 'book-3', author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
	{ id: 'book-4', author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
	{ id: 'book-5', author: 'George Orwell', title: '1984' },
	{ id: 'book-6', author: 'Jane Austen', title: 'Pride and Prejudice' },
	{ id: 'book-7', author: 'Marcus Aurelius', title: 'Meditations' },
	{
		id: 'book-8',
		author: 'Fyodor Dostoevsky',
		title: 'The Brothers Karamazov'
	},
	{ id: 'book-9', author: 'Lev Tolstoy', title: 'Anna Karenina' },
	{ id: 'book-10', author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' }
];

export function Test() {
	const Field = useField<FormFields>();
	const methods = useForm<FormFields>();

	return (
		<Form<FormFields>
			{...methods}
			onSubmit={(data) => console.log(data)}
			className='flex max-w-[30ch]'
		>
			<FormGroup>
				<Field
					name='firstname'
					required='asdasdasdsdadsads'
					minLength={{ value: 10, message: 'Liian lyhyt' }}
					maxLength={{ value: 5, message: 'Liian pitkä' }}
				>
					{({
						getInputProps,
						getLabelProps,
						error,
						errorId,
						inputId,
						required,
						descriptionId
					}) => (
						<FormElement className='text-base'>
							<LabelContainer className='gap-[1ch]'>
								<Label className='text-ellipsis' {...getLabelProps()}>
									Lablllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllel
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
								<Tooltip.Root>
									<Input {...getInputProps(descriptionId)} />
									<Tooltip.Trigger>
										<Icon icon='question-mark-circle' size='md' />
									</Tooltip.Trigger>
									<Tooltip.Content showArrow align='end' alignOffset={-20}>
										By default, tooltips appear both on hover and on focus. The
										trigger prop can be set to "focus" to display the tooltip
										only on focus, and not on hover.
									</Tooltip.Content>
								</Tooltip.Root>
							</FormControl>
							<FieldDescription id={descriptionId}>
								OHJE KENTÄLLE
							</FieldDescription>
							<FieldErrors id={errorId} error={error} />
						</FormElement>
					)}
				</Field>
			</FormGroup>

			<FormGroup>
				<Combobox
					items={books}
					itemToKey={(x) => x.id}
					itemToString={(x) => x?.title ?? ''}
				>
					{(item) => (
						<div className='flex flex-col'>
							<span>{item.title}</span>
							<span className='text-muted'>{item.author}</span>
						</div>
					)}
				</Combobox>
			</FormGroup>
			<button type='submit'>Submit</button>
		</Form>
	);
}
