import { T, TextVariant } from '@/components/text/t';
import clsx from 'clsx';

type FontDisplayProps = {
	title: string;
	textVariant: TextVariant;
	fallback: string;
	mobileFallback?: string;
};

export function FontDisplay({
	title,
	textVariant,
	fallback
}: FontDisplayProps) {
	return (
		<div className='bg-surface-container p-2'>
			<div className='-mx-2 -mt-2 flex items-center gap-4 bg-secondary-container'>
				<span className='inline-flex bg-primary-container p-2'>{title}</span>
				<T variant={textVariant}>Primary</T>
				<T variant={textVariant} className={fallback}>
					Fallback
				</T>
			</div>

			<div className='grid gap-2'>
				<T variant={textVariant} as='div' className='text-normal'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit.
				</T>

				<T
					variant={textVariant}
					className={clsx(fallback, 'text-normal')}
					as='div'
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
					lorem felis, posuere eget interdum quis, tempus vitae eros.Lorem ipsum
					dolor sit amet, consectetur adipiscing elit.
				</T>
			</div>
		</div>
	);
}
