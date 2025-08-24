import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import { ScrollContainer } from '../scroll-container/scroll-container';
import './table.css';

export interface TableContainerProps extends ComponentPropsWithoutRef<'div'> {}

export const TableContainer = forwardRef(function (props: TableContainerProps) {
	return (
		<div data-component='table-container'>
			<ScrollContainer axis='x'>
				<div {...props} />
			</ScrollContainer>
		</div>
	);
});

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
	striped?: boolean;
	gridLines?: boolean;
}

export const Table = forwardRef(function (
	{ striped, gridLines, ...rest }: TableProps,
	forwardedRef: ForwardedRef<HTMLTableElement>
) {
	return (
		<table
			data-component='table'
			data-striped={striped}
			data-grid-lines={gridLines}
			ref={forwardedRef}
			{...rest}
		/>
	);
});

export interface TableHeadProps extends ComponentPropsWithoutRef<'thead'> {}

export const TableHead = forwardRef(function (
	props: TableHeadProps,
	forwardedRef: ForwardedRef<HTMLTableSectionElement>
) {
	return <thead data-component='table-head' ref={forwardedRef} {...props} />;
});

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

export const TableBody = forwardRef(function (
	props: TableBodyProps,
	forwardedRef: ForwardedRef<HTMLTableSectionElement>
) {
	return <tbody data-component='table-body' ref={forwardedRef} {...props} />;
});

export interface TableFootProps extends ComponentPropsWithoutRef<'tfoot'> {}

export const TableFoot = forwardRef(function (
	props: TableFootProps,
	forwardedRef: ForwardedRef<HTMLTableSectionElement>
) {
	return <tfoot data-component='table-foot' ref={forwardedRef} {...props} />;
});

export interface TableHeaderRowProps extends ComponentPropsWithoutRef<'tr'> {}

export const TableHeadRow = forwardRef(function (
	props: TableHeaderRowProps,
	forwardedRef: ForwardedRef<HTMLTableRowElement>
) {
	return <tr data-component='table-head-row' ref={forwardedRef} {...props} />;
});

export interface TableBodyRowProps extends ComponentPropsWithoutRef<'tr'> {}

export const TableBodyRow = forwardRef(function (
	props: TableHeaderRowProps,
	forwardedRef: ForwardedRef<HTMLTableRowElement>
) {
	return <tr data-component='table-body-row' ref={forwardedRef} {...props} />;
});

export interface ThProps extends ComponentPropsWithoutRef<'th'> {}

export const Th = forwardRef(function (
	props: ThProps,
	forwardedRef: ForwardedRef<HTMLTableCellElement>
) {
	return <th data-component='table-th' ref={forwardedRef} {...props} />;
});

export interface TdProps extends ComponentPropsWithoutRef<'td'> {}

export const Td = forwardRef(function (
	props: ThProps,
	forwardedRef: ForwardedRef<HTMLTableCellElement>
) {
	return <td data-component='table-td' ref={forwardedRef} {...props} />;
});

export interface TableCaptionProps
	extends ComponentPropsWithoutRef<'caption'> {}

export const TableCaption = forwardRef(function (
	props: TableCaptionProps,
	forwardedRef: ForwardedRef<HTMLElement>
) {
	return (
		<caption data-component='table-caption' ref={forwardedRef} {...props} />
	);
});
