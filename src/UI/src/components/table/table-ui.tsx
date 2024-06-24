import { cn } from '@/utils/cn';
import * as React from 'react';
import './tables.css';

const TableWrapper = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div data-component='table-wrapper' ref={ref} {...props} />);

const TableContainer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
	<div data-component='table-container' ref={ref} {...props} />
));

const TableScrollContainer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
	<div data-component='table-scroll-container' ref={ref} {...props} />
));

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<table
		data-component='table'
		ref={ref}
		className={cn('w-full caption-bottom text-sm', className)}
		{...props}
	/>
));

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn('my-2 text-sm text-muted caption-top', className)}
		data-component='table-caption'
		{...props}
	/>
));

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn('[&_tr]:border-b', className)}
		data-component='table-header'
		{...props}
	/>
));

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn('[&_tr:last-child]:border-0', className)}
		data-component='table-body'
		{...props}
	/>
));

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tfoot ref={ref} data-component='table-footer' {...props} />);

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => <tr ref={ref} data-component='table-row' {...props} />);

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>((props, ref) => <th ref={ref} data-component='table-head' {...props} />);

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn('align-middle [&:has([role=checkbox])]:pr-0', className)}
		data-component='table-cell'
		{...props}
	/>
));

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead as TableHead,
	TableHeader,
	TableRow,
	TableScrollContainer,
	TableWrapper
};
