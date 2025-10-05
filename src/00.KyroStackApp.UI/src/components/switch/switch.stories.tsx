import type { Story } from '@ladle/react';
import { ElementRef, useEffect, useRef } from 'react';
import { Switch } from './switch';

export const Basic: Story = () => {
	return <Switch />;
};

export const Intermediate: Story = () => {
	const switchRef = useRef<ElementRef<'input'>>(null);

	useEffect(() => {
		if (switchRef.current) {
			switchRef.current.indeterminate = true;
		}
	}, []);

	return <Switch ref={switchRef} />;
};

Intermediate.storyName = 'Indeterminate';
