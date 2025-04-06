import { Calendar } from '@/components/calendar/calendar';
import { useDialog } from '@/components/dialog/use-dialog';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/popover/popover';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/button/button';
import { TopLayerDialog as Dialog } from '../../../components/dialog/dialog';
import { DialogBody } from '../../../components/dialog/dialog-body';
import { DialogFooter } from '../../../components/dialog/dialog-footer';
import { DialogHeader } from '../../../components/dialog/dialog-header';
import {
	createTypedCheckbox,
	createTypedInput,
	createTypedRadio,
	createTypedTextarea
} from '../../../components/forms/create-typed-field';
import { FormGroup } from '../../../components/forms/form-elements/form-group';
import { RhfForm } from '../../../components/forms/rhf-elements/rhf-form';
import { Icon } from '../../../components/icon/icon';
import { T } from '../../../components/text/t';

type ExampleFormFields = {
	firstName: string;
	lastName: string;
	age: number;
	description: string;
	isCoolPerson: boolean;
	mood: 'happy' | 'sad' | 'meh';
	dateOfBirth: string;
	animals: Array<{ name: string; age: number }>;
};

const TextInput = createTypedInput<ExampleFormFields>();
const Textarea = createTypedTextarea<ExampleFormFields>();
const Checkbox = createTypedCheckbox<ExampleFormFields>();
const Radio = createTypedRadio<ExampleFormFields>();

export function ExampleDialogs() {
	const exampleDialog = useDialog();
	const methods = useForm<ExampleFormFields>();

	const formId = useId();

	return (
		<div>
			<Button onClick={exampleDialog.open}>
				Open dialog <Icon icon='gear' size='md' />
			</Button>

			<div>
				<Dialog
					className='max-w-[200ch]'
					ref={exampleDialog.ref}
					unMountWhileClosed
					onClose={() => {
						methods.reset();
					}}
				>
					<DialogHeader>
						<T as='h1' variant='heading' className='m-0'>
							Who are you?
						</T>
					</DialogHeader>

					<DialogBody>
						<RhfForm<ExampleFormFields>
							id={formId}
							{...methods}
							onSubmit={async (_data, e) => {
								await new Promise((resolve) => {
									setTimeout(() => {
										resolve(null);
									}, 3000);
								});

								// Submit the form again, will close the dialog
								// because it has `method='dialog'`
								e?.target.submit();
							}}
							method='dialog'
						>
							<FormGroup className='grid grid-cols-2'>
								<TextInput
									name='firstName'
									label='First name'
									prefix={<Icon icon='person' />}
								/>
								<TextInput
									name='lastName'
									label='Last name'
									suffix={<Icon icon='person' />}
								/>
								<TextInput
									name='animals.0.age'
									type='number'
									validate={(age) =>
										age > 100 ? 'eläimet ei elä niin kauaa' : undefined
									}
									label='Last name'
									suffix={<Icon icon='person' />}
								/>
							</FormGroup>

							<FormGroup className='block'>
								<Textarea
									name='description'
									label='Description'
									rows={5}
									description='Describe your inner self'
									prefix={<Icon icon='gear' />}
									suffix='Suf'
									required='Required field'
								/>
							</FormGroup>

							<FormGroup className='block'>
								<Checkbox
									name='isCoolPerson'
									label='Are you a cool person?'
									description="Don't lie"
									validate={(value) =>
										value ? undefined : "Don't be like that"
									}
								/>
							</FormGroup>

							<FormGroup className='block'>
								<Radio.Group
									name='mood'
									label='How are you feeling?'
									required='Required'
									validate={(value) =>
										value === 'happy' ? 'Yeah right...' : undefined
									}
								>
									<Radio.Button
										name='mood'
										value='happy'
										label='Happier than ever'
										description='Anyone who picks this one is lying'
									/>
									<Radio.Button
										name='mood'
										value='meh'
										label='Same as usual...'
									/>
									<Radio.Button
										name='mood'
										value='sad'
										label="I'm coding javascript, what do you think?"
									/>
									<Radio.Error />
								</Radio.Group>
							</FormGroup>
						</RhfForm>

						<Popover>
							<PopoverTrigger>
								<Button>Open Popover</Button>
							</PopoverTrigger>

							<PopoverContent
								container={exampleDialog.ref.current?.element || undefined}
								className='bg-surface-container-high p-4'
							>
								<T variant='sub-heading' as='h3' className='mt-0 text-center'>
									Pick some date
								</T>
								<Calendar hideMonthButtons />
							</PopoverContent>
						</Popover>
					</DialogBody>

					<DialogFooter className='flex justify-between gap-2'>
						<Button
							color='secondary'
							type='button'
							onClick={exampleDialog.close}
						>
							Cancel
						</Button>

						<div className='flex gap-3'>
							<Button variant='secondary' form={formId} type='submit' disabled>
								Disabled
							</Button>
							<Button variant='primary' form={formId} type='submit'>
								Send
							</Button>
						</div>
					</DialogFooter>
				</Dialog>
			</div>
		</div>
	);
}
