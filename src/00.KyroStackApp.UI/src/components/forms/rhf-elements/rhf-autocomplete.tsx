import { AriaAttributes, Key, ReactNode } from 'react';
import {
	FieldPath,
	FieldValues,
	RegisterOptions,
	useController
} from 'react-hook-form';
import { Autocomplete, RenderListItem } from '../autocomplete/autocomplete';

export type RhfAutocompleteProps<
	TItem extends Record<string, unknown>,
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	id?: string;
	label?: ReactNode;
	name: TFieldName;
	readOnly?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	description?: ReactNode;
	items: Array<TItem>;
	itemToKey: (item: TItem | null) => Key;
	itemToString: (item: TItem | null) => string;
	isItemDisabled?: (item: TItem, index: number) => boolean;
	renderListItem?: RenderListItem<TItem>;
	['aria-label']?: AriaAttributes['aria-label'];
	['aria-describedby']?: AriaAttributes['aria-describedby'];
} & RegisterOptions<TFieldValues, TFieldName>;

export function RhfAutocomplete<
	TFieldValues extends FieldValues,
	TItem extends Record<string, unknown>,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	id,
	label,
	name,
	readOnly,
	disabled,
	autoFocus,
	items,
	itemToKey,
	itemToString,
	isItemDisabled,
	description,
	renderListItem,
	'aria-label': ariaLabel,
	'aria-describedby': ariaDescribedby,
	shouldUnregister,
	...rules
}: RhfAutocompleteProps<TItem, TFieldValues, TFieldName>) {
	const { field } = useController({
		name: name,
		shouldUnregister: shouldUnregister,
		disabled: disabled,
		rules: rules
	});

	const isRequired = Boolean(rules.required);

	return (
		<Autocomplete
			id={id}
			name={field.name}
			label={label}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			items={items}
			onInputValueChange={field.onChange}
			autoFocus={autoFocus}
			readOnly={readOnly}
			disabled={field.disabled}
			required={isRequired}
			renderListItem={renderListItem}
			description={description}
			inputValue={field.value ?? ''}
			itemToKey={itemToKey}
			itemToString={itemToString}
			isItemDisabled={isItemDisabled}
		/>
	);
}
