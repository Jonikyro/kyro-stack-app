import { Icon } from '@/components/icon/icon';
import { cn } from '@/utils/cn';
import { useId } from '@/utils/use-id';
import { useMutableDerivation } from '@/utils/use-mutable-derivation';
import clsx from 'clsx';
import {
	useCombobox,
	UseComboboxPropGetters,
	UseComboboxState,
	UseComboboxStateChangeOptions
} from 'downshift';
import fuzzysort from 'fuzzysort';
import { ComponentPropsWithoutRef, Key, ReactNode, useMemo } from 'react';
import { FieldDescription } from '../form-elements/field-description';
import { FormControl } from '../form-elements/form-control';
import { FormElement } from '../form-elements/form-element';
import { Input } from '../form-elements/input';
import { Label } from '../form-elements/label';
import { LabelContainer } from '../form-elements/label-container';

type RenderListItemRenderProps<TItem extends Record<string, unknown>> = {
	key: Key;
	displayValue: ReactNode;
	item: TItem;
	itemProps: ReturnType<UseComboboxPropGetters<TItem>['getItemProps']>;
	isHighlighted: boolean;
	isSelected: boolean;
	isDisabled: boolean;
	score: number;
};

export type RenderListItem<TItem extends Record<string, unknown>> = (
	props: RenderListItemRenderProps<TItem>
) => ReactNode;

export type ComboboxProps<TItem extends Record<string, unknown>> = {
	id?: string;
	inputId?: string;
	menuId?: string;
	items: Array<TItem>;
	label?: ReactNode;
	itemToKey: (item: TItem | null) => Key;
	itemToString: (item: TItem | null) => string;
	isItemDisabled?: (item: TItem, index: number) => boolean;
	renderListItem?: (props: RenderListItemRenderProps<TItem>) => ReactNode;
	description?: ReactNode;
	isOpen?: boolean;
	required?: boolean;
	selectedItem?: TItem | null;
	inputValue?: string;
	initialIsOpen?: boolean;
	initialInputValue?: string;
	initialSelectedItem?: TItem | null;
	onInputValueChange?: (value: string) => void;
} & ComponentPropsWithoutRef<'input'>;

function stateReducer<TItem>(
	_state: UseComboboxState<TItem>,
	{ changes, type }: UseComboboxStateChangeOptions<TItem>
): Partial<UseComboboxState<TItem>> {
	switch (type) {
		default:
			return changes;
	}
}

const itemMetadataSymbol = Symbol('meta');

const isItemDisabledDefault = () => false;

type ScoredItem<TItem extends Record<string, unknown>> = TItem & {
	[itemMetadataSymbol]: {
		score: number;
		displayValue: ReactNode;
	};
};

export function Combobox<TItem extends Record<string, unknown>>({
	id,
	inputId,
	menuId,
	items,
	label,
	itemToKey,
	itemToString,
	isItemDisabled,
	description,
	isOpen: controlledIsOpen,
	required,
	renderListItem,
	selectedItem: controlledSelectedItem,
	inputValue: controlledInputValue,
	initialInputValue,
	initialIsOpen,
	initialSelectedItem,
	onInputValueChange,
	...rest
}: ComboboxProps<TItem>) {
	const [derivedInputValue, setDerivedInputValue] = useMutableDerivation(
		controlledInputValue ?? ''
	);

	const scoreSortedItems = useMemo(
		() =>
			items
				.map((item) => {
					const itemStringified = itemToString(item);

					const matches = fuzzysort.single(derivedInputValue, itemStringified);
					const displayValue = matches
						? matches.highlight((m, i) => <b key={i}>{m}</b>)
						: itemStringified;

					return {
						...item,
						[itemMetadataSymbol]: {
							score: matches?.score ?? 0,
							displayValue
						}
					} satisfies ScoredItem<TItem>;
				})
				.sort(
					(a, b) => b[itemMetadataSymbol].score - a[itemMetadataSymbol].score
				),
		[derivedInputValue, itemToString, items]
	);

	const {
		getInputProps,
		getMenuProps,
		getLabelProps,
		getItemProps,
		isOpen,
		highlightedIndex,
		selectedItem
	} = useCombobox({
		inputId,
		menuId,
		items: scoreSortedItems,
		stateReducer,
		itemToKey,
		itemToString,
		initialIsOpen,
		initialInputValue,
		initialSelectedItem,
		isItemDisabled: isItemDisabled ?? isItemDisabledDefault,
		isOpen: controlledIsOpen,
		selectedItem: controlledSelectedItem,
		inputValue: derivedInputValue,
		onInputValueChange: (value) => {
			onInputValueChange?.(value.inputValue);
			setDerivedInputValue(value.inputValue);
		}
	});

	const descriptionId = useId();

	return (
		<FormElement id={id} className='relative'>
			{Boolean(label) && (
				<LabelContainer className='flex items-center gap-[0.5ch]'>
					<Label {...getLabelProps()}>{label}</Label>
					{required && (
						<Icon icon='asterisk' size='xs' className='text-error' />
					)}
				</LabelContainer>
			)}

			<FormControl>
				<Input
					{...rest}
					{...getInputProps({
						'aria-describedby': description ? descriptionId : undefined
					})}
				/>
			</FormControl>
			<ul
				{...getMenuProps()}
				className={cn(
					!isOpen && 'hidden',
					'absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-md bg-surface-container-highest p-2'
				)}
			>
				{isOpen &&
					scoreSortedItems.map((item, index) => {
						const itemProps = getItemProps({ item, index });
						const isHighlighted = highlightedIndex === index;
						const isSelected = selectedItem === item;
						const isDisabled = itemProps['aria-disabled'];

						if (renderListItem) {
							return renderListItem({
								key: itemToKey(item),
								displayValue: item[itemMetadataSymbol].displayValue,
								item,
								itemProps,
								isHighlighted,
								isSelected,
								isDisabled,
								score: item[itemMetadataSymbol].score
							});
						}

						return (
							<li
								key={itemToKey(item)}
								className={clsx(
									isHighlighted && 'bg-tertiary',
									isSelected && 'bg-primary',
									isDisabled && 'cursor-not-allowed bg-disabled',
									'rounded-sm p-1'
								)}
								{...itemProps}
							>
								<span>{item[itemMetadataSymbol].displayValue}</span>
							</li>
						);
					})}
			</ul>
			{description && (
				<FieldDescription id={descriptionId}>{description}</FieldDescription>
			)}
		</FormElement>
	);
}
