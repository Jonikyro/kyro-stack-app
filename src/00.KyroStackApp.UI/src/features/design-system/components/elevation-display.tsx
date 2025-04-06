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
		<div className={clsx('h-16 w-56 bg-surface-container', className)}>
			{display}
		</div>
	);
}
