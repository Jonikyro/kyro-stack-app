import clsx from 'clsx';

/** @file Remove this file once you are done with your design system */

export function DesignSystem() {
	return (
		<div className='bg-gray-100 pb-8 pt-4 font-semibold'>
			<h2>Colors</h2>
			<div className='flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-primary text-on-primary'
					display='Primary'
					onClassName='bg-on-primary text-primary'
				/>
				<ColorDisplay
					className='bg-secondary text-on-secondary'
					display='Secondary'
					onClassName='bg-on-secondary text-secondary'
				/>
				<ColorDisplay
					className='bg-tertiary text-on-tertiary'
					display='Tertiary'
					onClassName='bg-on-tertiary text-tertiary'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-primary-container text-on-primary-container'
					display='Primary Container'
					onClassName='bg-on-primary-container text-primary-container'
				/>
				<ColorDisplay
					className='bg-secondary-container text-on-secondary-container'
					display='Secondary Container'
					onClassName='bg-on-secondary-container text-secondary-container'
				/>
				<ColorDisplay
					className='bg-tertiary-container text-on-tertiary-container'
					display='Tertiary Container'
					onClassName='bg-on-tertiary-container text-tertiary-container'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-surface-dim text-on-surface'
					display='Surface Dim'
				/>
				<ColorDisplay
					className='bg-surface text-on-surface'
					display='Surface'
				/>
				<ColorDisplay
					className='bg-surface-bright text-on-surface'
					display='Surface Bright'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-surface-container-lowest text-on-surface'
					display='Surface Container Lowest'
				/>
				<ColorDisplay
					className='bg-surface-container-low text-on-surface'
					display='Surface Container Low'
				/>
				<ColorDisplay
					className='bg-surface-container text-on-surface'
					display='Surface Container'
				/>
				<ColorDisplay
					className='bg-surface-container-high text-on-surface'
					display='Surface Container High'
				/>
				<ColorDisplay
					className='bg-surface-container-highest text-on-surface'
					display='Surface Container Highest'
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-1'>
				<ColorDisplay
					className='bg-error text-on-error'
					onClassName='bg-on-error text-error'
					display='Error'
				/>
			</div>

			<h2 className='mt-14'>Borders</h2>

			<div className='mt-4 flex flex-wrap gap-1'>
				<BorderDisplay className='rounded-sm' display='Rounded sm' />
				<BorderDisplay className='rounded-md' display='Rounded md' />
				<BorderDisplay className='rounded-lg' display='Rounded lg' />
				<BorderDisplay className='rounded-xl' display='Rounded xl' />
				<BorderDisplay className='rounded-2xl' display='Rounded 2xl' />
				<BorderDisplay className='rounded-3xl' display='Rounded 3xl' />
				<BorderDisplay className='rounded-full' display='Rounded full' />
			</div>

			<h2 className='mt-14'>Elevation</h2>
			<div className='mt-4 flex flex-wrap gap-5'>
				<ElevationDisplay className='shadow-none' display='Shadow none' />
				<ElevationDisplay className='shadow-sm' display='Shadow sm' />
				<ElevationDisplay className='shadow' display='Shadow' />
				<ElevationDisplay className='shadow-md' display='Shadow md' />
				<ElevationDisplay className='shadow-lg' display='Shadow lg' />
				<ElevationDisplay className='shadow-xl' display='Shadow xl' />
				<ElevationDisplay className='shadow-2xl' display='Shadow 2xl' />
			</div>
		</div>
	);
}

type ColorDisplayProps = {
	className: string;
	display: string;
	onClassName?: string;
};

function ColorDisplay({ className, onClassName, display }: ColorDisplayProps) {
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

type BorderDisplayProps = {
	className: string;
	display: string;
};

function BorderDisplay({ className, display }: BorderDisplayProps) {
	return (
		<div
			className={clsx('h-16 w-56 bg-primary p-3 text-on-primary', className)}
		>
			{display}
		</div>
	);
}

type ElevationDisplayProps = {
	className: string;
	display: string;
};

function ElevationDisplay({ className, display }: ElevationDisplayProps) {
	return (
		<div className={clsx('h-16 w-56 bg-surface-container', className)}>
			{display}
		</div>
	);
}
