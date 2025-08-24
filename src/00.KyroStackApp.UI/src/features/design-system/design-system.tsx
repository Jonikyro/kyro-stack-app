import { T } from '../../components/text/t';
import { BorderDisplay } from './components/border-display';
import { ColorDisplay } from './components/color-display';
import { ElevationDisplay } from './components/elevation-display';
import { ExampleDialogs } from './components/example-dialog';
import { ExampleForm } from './components/example-form';
import { ExampleTables } from './components/example-tables';
import { FontDisplay } from './components/font-display';

export function DesignSystem() {
	return (
		<div className='pt-4 pb-8'>
			<T as='h2' variant='heading'>
				Colors
			</T>
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
					className='bg-error text-on-error'
					onClassName='bg-on-error text-error'
					display='Error'
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

			<T as='h2' variant='heading'>
				Borders
			</T>

			<div className='mt-4 flex flex-wrap gap-1'>
				<BorderDisplay className='rounded-sm' display='Rounded sm' />
				<BorderDisplay className='rounded' display='Rounded' />
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
					fallback='font-["Heading-Fallback"]'
					mobileFallback='font-["Heading-Android-Fallback"]'
				/>
				<FontDisplay
					title='Sub Heading'
					textVariant='sub-heading'
					fallback='font-["Heading-Fallback"]'
					mobileFallback='font-["Heading-Android-Fallback"]'
				/>
				<FontDisplay
					title='Normal'
					textVariant='normal'
					fallback='font-["Base-Fallback"]'
				/>
				<FontDisplay
					title='Small'
					textVariant='small'
					fallback='font-["Base-Fallback"]'
				/>
			</div>

			<T as='h2' variant='heading'>
				Forms
			</T>

			<div className='mt-4'>
				<ExampleForm />
			</div>

			<T as='h2' variant='heading'>
				Dialogs / Menus / Popovers
			</T>

			<div className='mt-4 flex gap-6'>
				<ExampleDialogs />
			</div>

			<div className='mt-4'>
				<T as='h2' variant='heading'>
					Tables
				</T>
				<ExampleTables />
			</div>
		</div>
	);
}
