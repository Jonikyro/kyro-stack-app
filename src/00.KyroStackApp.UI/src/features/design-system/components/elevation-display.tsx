import clsx from 'clsx';

type ElevationDisplayProps = {
	className: string;
	display: string;
};

export function ElevationDisplay({
	className,
	display
}: ElevationDisplayProps) {
	return (
		<div className={clsx('bg-surface-container h-16 w-56', className)}>
			{display}
		</div>
	);
}
