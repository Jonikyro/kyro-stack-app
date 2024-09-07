import clsx from 'clsx';
import { Switch } from '../switch/switch';
import { T, TextVariant } from '../text/t';

/** @file Remove this file once you are done with your design system */

export function DesignSystem() {
	return (
		<div className='pb-8 pt-4'>
			<T as='h2' variant='heading'>
				Colors
			</T>

			<Switch />
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

			<T as='h2' variant='heading'>
				Borders
			</T>

			<div className='mt-4 flex flex-wrap gap-1'>
				<BorderDisplay className='rounded-sm' display='Rounded sm' />
				<BorderDisplay className='rounded-md' display='Rounded md' />
				<BorderDisplay className='rounded-lg' display='Rounded lg' />
				<BorderDisplay className='rounded-xl' display='Rounded xl' />
				<BorderDisplay className='rounded-2xl' display='Rounded 2xl' />
				<BorderDisplay className='rounded-3xl' display='Rounded 3xl' />
				<BorderDisplay className='rounded-full' display='Rounded full' />
			</div>

			<T as='h2' variant='heading'>
				Elevation
			</T>

			<div className='mt-4 flex flex-wrap gap-5'>
				<ElevationDisplay className='shadow-none' display='Shadow none' />
				<ElevationDisplay className='shadow-sm' display='Shadow sm' />
				<ElevationDisplay className='shadow' display='Shadow' />
				<ElevationDisplay className='shadow-md' display='Shadow md' />
				<ElevationDisplay className='shadow-lg' display='Shadow lg' />
				<ElevationDisplay className='shadow-xl' display='Shadow xl' />
				<ElevationDisplay className='shadow-2xl' display='Shadow 2xl' />
			</div>

			<T as='h2' variant='heading'>
				Typography
			</T>

			<div className='mt-4 grid gap-5'>
				<FontDisplay
					title='Heading'
					textVariant='heading'
					fallback='font-["Kameron-Fallback"]'
					mobileFallback='font-["Kameron-Android-Fallback"]'
				/>
				<div className='flex gap-4'>
					<T variant='sub-heading' className='leading-6'>
						Sub Heading
					</T>
					<T
						variant='sub-heading'
						className='font-[Sub-Heading-Fallback] leading-6'
					>
						Sub Heading Fallback
					</T>
				</div>
				<div className='flex gap-4'>
					<T variant='regular' className='leading-6'>
						Regular
					</T>
					<T variant='regular' className='font-[Regular-Fallback] leading-6'>
						Regular fallback
					</T>
				</div>
				<div className='flex gap-4'>
					<T variant='small' className='leading-6'>
						Small
					</T>
					<T variant='small' className='font-[Regular-Fallback] leading-6'>
						Small Fallback
					</T>
				</div>
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
			className={clsx(
				'h-16 w-56 bg-surface-container-highest p-3 text-on-surface',
				className
			)}
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

type FontDisplayProps = {
	title: string;
	textVariant: TextVariant;
	fallback: string;
	mobileFallback?: string;
};

function FontDisplay({
	title,
	textVariant,
	fallback,
	mobileFallback
}: FontDisplayProps) {
	return (
		<div className='bg-surface-container p-2'>
			<div className='inline-flex'>
				<T className='text-lg' variant={textVariant}>
					{title}
				</T>
				<T variant={textVariant} className={clsx(fallback, 'text-lg')}>
					{title} Fallback
				</T>
				<T variant={textVariant} className={clsx(mobileFallback, 'text-lg')}>
					{title} Mobile Fallback
				</T>
			</div>
			<div className='grid gap-2'>
				<T variant={textVariant} className='block text-sm'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Vestibulum lorem felis,
					posuere eget interdum quis, tempus vitae eros.Lorem ipsum dolor sit
					amet, consectetur adipiscing elit. Vestibulum lorem felis, posuere
					eget interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.
				</T>

				<T
					variant={textVariant}
					className={clsx(fallback, 'mt-3 block text-sm')}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Vestibulum lorem felis,
					posuere eget interdum quis, tempus vitae eros.Lorem ipsum dolor sit
					amet, consectetur adipiscing elit. Vestibulum lorem felis, posuere
					eget interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.
				</T>

				<T
					variant={textVariant}
					className={clsx(mobileFallback, 'mt-3 block text-sm')}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Vestibulum lorem felis,
					posuere eget interdum quis, tempus vitae eros.Lorem ipsum dolor sit
					amet, consectetur adipiscing elit. Vestibulum lorem felis, posuere
					eget interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Vestibulum lorem felis, posuere eget
					interdum quis, tempus vitae eros.
				</T>
			</div>
		</div>
	);
}
