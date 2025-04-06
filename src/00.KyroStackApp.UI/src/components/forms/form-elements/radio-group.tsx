import { InputGroup, InputGroupProps } from './input-group';

type RadioGroupProps = Omit<InputGroupProps, 'role'>;

export function RadioGroup(props: RadioGroupProps) {
	return <InputGroup {...props} role='radiogroup' />;
}
