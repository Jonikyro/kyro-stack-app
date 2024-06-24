import { Button } from '@/components/button/button';
import { Icon } from '@/components/icon';
import * as Popover from '@/components/popover/popover';
import { UseComboboxProps, useCombobox } from 'downshift';
import {
	FormControl,
	FormElement,
	Input,
	InputFix,
	Label,
	LabelContainer
} from '../form/form-ui';

import { useId } from '@/utils/use-id';
import React from 'react';
import './list-selectors.css';

type ItemConversionProps<TItem> = TItem extends string
	? {
			itemToKey?: (item: TItem, index: number) => string;
	  }
	: {
			itemToKey: (item: TItem, index: number) => string;
	  };

type ComboboxProps<TItem> = UseComboboxProps<TItem> &
	ItemConversionProps<TItem> & {
		noResultsText?: string;
		children: (
			item: TItem,
			selectedItem: TItem | null,
			index: number
		) => React.ReactNode;
	};

export function Combobox<TItem>({
	itemToKey,
	children,
	noResultsText,
	...rest
}: ComboboxProps<TItem>) {
	const inputId = useId();

	const {
		highlightedIndex,
		selectItem,
		selectedItem,
		getInputProps,
		getLabelProps,
		getMenuProps,
		getItemProps,
		getToggleButtonProps,
		isOpen,
		setInputValue
	} = useCombobox<TItem>(rest);

	const updateInputValue = () => {
		if (!selectedItem) {
			setInputValue('');
			return;
		}

		if ('itemToString' in rest && typeof rest.itemToString === 'function') {
			setInputValue(rest.itemToString(selectedItem));
			return;
		}

		setInputValue(selectedItem?.toString() ?? '');
	};

	return (
		<div data-component='combobox'>
			<Popover.Root open={isOpen} modal={false}>
				<FormElement>
					<LabelContainer>
						<Label
							className='text-ellipsis'
							{...getLabelProps({ htmlFor: inputId })}
						>
							Combobox
						</Label>
					</LabelContainer>
					<Popover.Anchor asChild>
						<FormControl>
							<InputFix htmlFor={inputId}>@</InputFix>
							<Input
								{...getInputProps({ id: inputId })}
								onBlur={updateInputValue}
							/>
							<Button variant='unstyled' {...getToggleButtonProps()}>
								<Icon icon='chevron-down' />
							</Button>
						</FormControl>
					</Popover.Anchor>
				</FormElement>
				<Popover.Content
					role={undefined}
					onOpenAutoFocus={preventAutoFocus}
					sideOffset={5}
				>
					<ul
						data-component='combobox-list'
						{...getMenuProps({}, { suppressRefError: true })}
					>
						{rest.items.length === 0 && !!noResultsText && (
							<li data-component='combobox-list-item' aria-hidden='true'>
								<span>{noResultsText}</span>
							</li>
						)}
						{rest.items.map((item, index) => (
							<li
								key={
									itemToKey?.(item, index) ??
									(typeof item === 'string' ? item : index)
								}
								data-component='combobox-list-item'
								data-selected={selectedItem === item}
								data-highlighted={highlightedIndex === index}
								{...getItemProps({ item, index })}
							>
								{children(item, selectedItem, index)}
							</li>
						))}
					</ul>
				</Popover.Content>
			</Popover.Root>
		</div>
	);
}

function preventAutoFocus(e: Event) {
	e.preventDefault();
}
