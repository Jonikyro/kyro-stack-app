import clsx from 'clsx';

type BorderDisplayProps = {
	className: string;
	display: string;
};

export function BorderDisplay({ className, display }: BorderDisplayProps) {
	return (
		<div
			className={clsx(
				'h-16 w-56 bg-surface-container-highest p-3 text-on-surface',
				className
			)}
		>
			{display}
		</div>
	);
}
