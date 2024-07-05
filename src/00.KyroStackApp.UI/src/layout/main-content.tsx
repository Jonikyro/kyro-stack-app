import { ComponentPropsWithoutRef } from 'react';

export type MainContentProps = Omit<ComponentPropsWithoutRef<'main'>, 'id'>;

export function MainContent({ children, ...rest }: MainContentProps) {
	return (
		<main id='main-content' {...rest}>
			{children}
		</main>
	);
}
