import { Confirm } from '@/components/confirm/confirm';
import { useConfirm } from '@/components/confirm/use-confirm';
import { useDialog } from '@/components/dialog/use-dialog';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/button/button';
import { Dialog } from '../../../components/dialog/dialog';
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
	const exampleConfirm = useConfirm();
	const methods = useForm<ExampleFormFields>();

	const formId = useId();

	return (
		<div>
			<Button onClick={exampleDialog.open}>
				Open dialog <Icon icon='gear' size='md' />
			</Button>

			<div>
				<Dialog
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
							method='dialog'
							onSubmit={async (_data, e) => {
								exampleConfirm.open(e);

								await new Promise((resolve) => {
									setTimeout(() => {
										resolve(null);
									}, 3000);
								});

								// Submit the form again, will close the dialog
								// because it has `method='dialog'`
								e?.target.submit();
							}}
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

				<Confirm
					ref={exampleConfirm.ref}
					onConfirm={() => alert(JSON.stringify(methods.getValues()))}
				>
					<DialogHeader>
						<T as='h1' variant='heading' className='m-0'>
							Are you sure?
						</T>
					</DialogHeader>

					<DialogBody>
						<T>Are you sure you want to do this?</T>
					</DialogBody>
				</Confirm>
			</div>
		</div>
	);
}
