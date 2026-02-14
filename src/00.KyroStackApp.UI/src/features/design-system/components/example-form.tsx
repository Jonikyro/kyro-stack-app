import { getLocalTimeZone, today } from '@internationalized/date';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/button/button';
import {
	createTypedAutocomplete,
	createTypedCalendar,
	createTypedCheckbox,
	createTypedInput,
	createTypedRadio,
	createTypedSwitch,
	createTypedTextarea
} from '../../../components/forms/create-typed-field';
import { FormGroup } from '../../../components/forms/form-elements/form-group';
import { RhfForm } from '../../../components/forms/rhf-elements/rhf-form';
import { Icon } from '../../../components/icon/icon';

type ExampleFormFields = {
	firstName: string;
	lastName: string;
	age: number;
	description: string;
	coolPerson: boolean;
	mood: 'happy' | 'sad' | 'meh';
	dateOfBirth: string;
	dateOfBird: string;
	acceptRules: boolean;
	city: string;
};

const TextInput = createTypedInput<ExampleFormFields>();
const Textarea = createTypedTextarea<ExampleFormFields>();
const Checkbox = createTypedCheckbox<ExampleFormFields>();
const Switch = createTypedSwitch<ExampleFormFields>();
const Radio = createTypedRadio<ExampleFormFields>();
const Calendar = createTypedCalendar<ExampleFormFields>();
const Autocomplete = createTypedAutocomplete<ExampleFormFields>();

const listOfThings = [
	{ label: 'Chatterbridge', value: 'Chatterbridge' },
	{ label: 'Tagchat', value: 'Tagchat' },
	{ label: 'Yambee', value: 'Yambee' },
	{ label: 'Photobug', value: 'Photobug' },
	{ label: 'Livepath', value: 'Livepath' },
	{ label: 'Theodor Dawber', value: 'Theodor Dawber' },
	{ label: 'Dwight Stollenberg', value: 'Dwight Stollenberg' },
	{ label: 'Maddalena Prettjohn', value: 'Maddalena Prettjohn' },
	{ label: 'Maureen Fassan', value: 'Maureen Fassan' },
	{ label: 'Abbie Binyon', value: 'Abbie Binyon' }
];

export function ExampleForm() {
	const methods = useForm<ExampleFormFields>({
		defaultValues: {
			city: 'Jykylä'
		}
	});

	return (
		<div className='bg-surface-container max-w-[60ch] rounded-md p-4 md:mx-auto'>
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
						required='Required field'
					/>
				</FormGroup>

				<FormGroup className='block'>
					<Textarea
						name='description'
						label='Description'
						rows={5}
						description='Describe your inner self'
						prefix={<Icon icon='person' />}
						suffix={<Icon icon='person' />}
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

				<FormGroup className='block'>
					<Calendar
						name='dateOfBirth'
						label='Date of birth'
						description={
							<span className='inline-flex items-baseline gap-[0.5ch]'>
								<Icon icon='person' className='self-center' />
								<span>They day you were born</span>
							</span>
						}
						rules={{
							required: 'Required field',
							validate: (value) =>
								value === today(getLocalTimeZone()).toString()
									? 'You were born today?!'
									: undefined
						}}
					/>
				</FormGroup>

				<FormGroup className='block'>
					<AutocompleteTest />
				</FormGroup>

				<FormGroup className='my-5 block'>
					<Switch
						name='acceptRules'
						label='I accept rules'
						description='These rules were not meant to be broken'
						validate={(value) =>
							value != true ? 'You need to accept rules!' : undefined
						}
					/>
				</FormGroup>

				<div className='flex justify-between'>
					<Button onClick={() => methods.reset()}>
						<Icon icon='reset' /> Reset
					</Button>

					<Button variant='primary' type='submit'>
						Send <Icon icon='paper-plane' />
					</Button>
				</div>
			</RhfForm>
		</div>
	);
}

function AutocompleteTest() {
	return (
		<>
			<Autocomplete
				name='city'
				label='City'
				required='Required field'
				description='Choose your city'
				items={listOfThings}
				itemToKey={(item) => item?.value ?? ''}
				itemToString={(item) => item?.label ?? ''}
			/>
		</>
	);
}
