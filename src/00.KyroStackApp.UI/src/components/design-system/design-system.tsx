import { useId } from '@/utils/use-id';
import clsx from 'clsx';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../button/button';
import { Dialog, DialogRef } from '../dialog/dialog';
import { DialogBody } from '../dialog/dialog-body';
import { DialogFooter } from '../dialog/dialog-footer';
import { DialogHeader } from '../dialog/dialog-header';
import {
	createTypedCheckbox,
	createTypedInput,
	createTypedRadio,
	createTypedTextarea
} from '../forms/create-typed-field';
import { FormGroup } from '../forms/form-elements/form-group';
import { RhfForm } from '../forms/rhf-elements/rhf-form';
import { Icon } from '../icon/icon';
import { Switch } from '../switch/switch';
import { T, TextVariant } from '../text/t';

/** @file Remove this file once you are done with your design system */

export function DesignSystem() {
	return (
		<div className='pb-8 pt-4'>
			<T as='h2' variant='heading'>
				Colors
			</T>

			<Switch />
			<div className='flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-primary text-on-primary'
					display='Primary'
					onClassName='bg-on-primary text-primary'
				/>
				<ColorDisplay
					className='bg-secondary text-on-secondary'
					display='Secondary'
					onClassName='bg-on-secondary text-secondary'
				/>
				<ColorDisplay
					className='bg-tertiary text-on-tertiary'
					display='Tertiary'
					onClassName='bg-on-tertiary text-tertiary'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-primary-container text-on-primary-container'
					display='Primary Container'
					onClassName='bg-on-primary-container text-primary-container'
				/>
				<ColorDisplay
					className='bg-secondary-container text-on-secondary-container'
					display='Secondary Container'
					onClassName='bg-on-secondary-container text-secondary-container'
				/>
				<ColorDisplay
					className='bg-tertiary-container text-on-tertiary-container'
					display='Tertiary Container'
					onClassName='bg-on-tertiary-container text-tertiary-container'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-surface-dim text-on-surface'
					display='Surface Dim'
				/>
				<ColorDisplay
					className='bg-surface text-on-surface'
					display='Surface'
				/>
				<ColorDisplay
					className='bg-surface-bright text-on-surface'
					display='Surface Bright'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-surface-container-lowest text-on-surface'
					display='Surface Container Lowest'
				/>
				<ColorDisplay
					className='bg-surface-container-low text-on-surface'
					display='Surface Container Low'
				/>
				<ColorDisplay
					className='bg-surface-container text-on-surface'
					display='Surface Container'
				/>
				<ColorDisplay
					className='bg-surface-container-high text-on-surface'
					display='Surface Container High'
				/>
				<ColorDisplay
					className='bg-surface-container-highest text-on-surface'
					display='Surface Container Highest'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-error text-on-error'
					onClassName='bg-on-error text-error'
					display='Error'
				/>
			</div>

			<T as='h2' variant='heading'>
				Borders
			</T>

			<div className='mt-4 flex flex-wrap gap-1'>
				<BorderDisplay className='rounded-sm' display='Rounded sm' />
				<BorderDisplay className='rounded-md' display='Rounded md' />
				<BorderDisplay className='rounded-lg' display='Rounded lg' />
				<BorderDisplay className='rounded-xl' display='Rounded xl' />
				<BorderDisplay className='rounded-2xl' display='Rounded 2xl' />
				<BorderDisplay className='rounded-3xl' display='Rounded 3xl' />
				<BorderDisplay className='rounded-full' display='Rounded full' />
			</div>

			<T as='h2' variant='heading'>
				Elevation
			</T>

			<div className='mt-4 flex flex-wrap gap-5'>
				<ElevationDisplay className='shadow-none' display='Shadow none' />
				<ElevationDisplay className='shadow-sm' display='Shadow sm' />
				<ElevationDisplay className='shadow' display='Shadow' />
				<ElevationDisplay className='shadow-md' display='Shadow md' />
				<ElevationDisplay className='shadow-lg' display='Shadow lg' />
				<ElevationDisplay className='shadow-xl' display='Shadow xl' />
				<ElevationDisplay className='shadow-2xl' display='Shadow 2xl' />
			</div>

			<T as='h2' variant='heading'>
				Typography
			</T>

			<div className='mt-4 grid gap-5'>
				<FontDisplay
					title='Heading'
					textVariant='heading'
					fallback='font-["Heading-Fallback"]'
					mobileFallback='font-["Heading-Android-Fallback"]'
				/>
				<FontDisplay
					title='Sub Heading'
					textVariant='sub-heading'
					fallback='font-["Heading-Fallback"]'
					mobileFallback='font-["Heading-Android-Fallback"]'
				/>
				<FontDisplay
					title='Normal'
					textVariant='normal'
					fallback='font-["Normal-Fallback"]'
				/>
				<FontDisplay
					title='Small'
					textVariant='small'
					fallback='font-["Normal-Fallback"]'
				/>
			</div>

			<T as='h2' variant='heading'>
				Forms
			</T>

			<div className='mt-4'>
				<ExampleForm />
			</div>

			<T as='h2' variant='heading'>
				Dialogs
			</T>

			<div className='mt-4'>
				<ExampleDialogs />
			</div>
		</div>
	);
}

type ColorDisplayProps = {
	className: string;
	display: string;
	onClassName?: string;
};

function ColorDisplay({ className, onClassName, display }: ColorDisplayProps) {
	return (
		<div className='w-56 overflow-hidden rounded-md'>
			<div className={clsx(className, 'min-h-16 p-1')}>{display}</div>
			{!!onClassName && (
				<div
					className={clsx(onClassName, 'min-h-8 px-1 py-2')}
				>{`On ${display}`}</div>
			)}
		</div>
	);
}

type BorderDisplayProps = {
	className: string;
	display: string;
};

function BorderDisplay({ className, display }: BorderDisplayProps) {
	return (
		<div
			className={clsx(
				'h-16 w-56 bg-surface-container-highest p-3 text-on-surface',
				className
			)}
		>
			{display}
		</div>
	);
}

type ElevationDisplayProps = {
	className: string;
	display: string;
};

function ElevationDisplay({ className, display }: ElevationDisplayProps) {
	return (
		<div className={clsx('h-16 w-56 bg-surface-container', className)}>
			{display}
		</div>
	);
}

type FontDisplayProps = {
	title: string;
	textVariant: TextVariant;
	fallback: string;
	mobileFallback?: string;
};

function FontDisplay({ title, textVariant, fallback }: FontDisplayProps) {
	return (
		<div className='bg-surface-container p-2'>
			<div className='-mx-2 -mt-2 flex items-center gap-4 bg-secondary-container'>
				<span className='inline-flex bg-primary-container p-2'>{title}</span>
				<T variant={textVariant}>Primary</T>
				<T variant={textVariant} className={fallback}>
					Fallback
				</T>
			</div>

			<div className='grid gap-2'>
				<T variant={textVariant} as='div' className='text-normal'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit.
				</T>

				<T
					variant={textVariant}
					className={clsx(fallback, 'text-normal')}
					as='div'
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit.
				</T>
			</div>
		</div>
	);
}

type ExampleFormFields = {
	firstName: string;
	lastName: string;
	age: number;
	description: string;
	coolPerson: boolean;
	mood: 'happy' | 'sad' | 'meh';
};

const TextInput = createTypedInput<ExampleFormFields>();
const Textarea = createTypedTextarea<ExampleFormFields>();
const Checkbox = createTypedCheckbox<ExampleFormFields>();
const Radio = createTypedRadio<ExampleFormFields>();

function ExampleForm() {
	const methods = useForm<ExampleFormFields>();

	return (
		<div className='max-w-[60ch] rounded-md bg-surface-container p-4 md:mx-auto'>
			<RhfForm<ExampleFormFields>
				{...methods}
				onSubmit={(data) => alert(JSON.stringify(data))}
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
						prefix={<span className='block [writing-mode:tb]'>click me</span>}
						suffix={<span className='block [writing-mode:tb]'>yey focus</span>}
						required='Required field'
					/>
				</FormGroup>

				<FormGroup className='block'>
					<Checkbox
						name='coolPerson'
						label='Are you a cool person?'
						description="Don't lie"
						validate={(value) => (value ? undefined : "Don't be like that")}
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
						<Radio.Button name='mood' value='meh' label='Same as usual...' />
						<Radio.Button
							name='mood'
							value='sad'
							label="I'm coding javascript, what do you think?"
						/>
						<Radio.Error />
					</Radio.Group>
				</FormGroup>

				<div className='flex justify-between'>
					<Button onClick={() => methods.reset()}>
						<Icon icon='reset' className='mt-capex' /> Reset
					</Button>

					<Button variant='primary' type='submit'>
						Send <Icon icon='paper-plane' />
					</Button>
				</div>
			</RhfForm>
		</div>
	);
}

function ExampleDialogs() {
	const dialogRef = useRef<DialogRef>(null);
	const methods = useForm<ExampleFormFields>();

	const formId = useId();

	return (
		<div>
			<Button
				onClick={() => {
					dialogRef.current?.open();
				}}
			>
				Open dialog <Icon icon='gear' size='md' />
			</Button>

			<div>
				<Dialog
					ref={dialogRef}
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
							onSubmit={async (data, e) => {
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
									name='coolPerson'
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
							onClick={() => {
								dialogRef.current?.close();
							}}
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
