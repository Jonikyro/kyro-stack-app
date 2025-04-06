import clsx from 'clsx';

type ColorDisplayProps = {
	className: string;
	display: string;
	onClassName?: string;
};

export function ColorDisplay({
	className,
	onClassName,
	display
}: ColorDisplayProps) {
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
