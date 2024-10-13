/* eslint-disable react-refresh/only-export-components */

// THIS FILE IS GENERATED, edit `src/icons/icon-template.txt` instead
// then run `npm run build:icons`

import clsx from 'clsx';
import { type SVGProps, useMemo } from 'react';
import href from './svg-sprite.svg';
export { href };

const sizeClassName = {
	font: 'w-[1em] h-[1em]',
	xs: 'w-3 h-3',
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
	xl: 'w-7 h-7'
} as const;

type IconSize = keyof typeof sizeClassName;

type IconProps = {
	icon: IconName;
	size?: IconSize;
} & SVGProps<SVGSVGElement>;

export function Icon({ icon, size = 'font', className, ...props }: IconProps) {
	const iconClassName = useMemo(
		() => clsx(sizeClassName[size], 'inline self-center', className),
		[size, className]
	);

	return (
		<svg role='presentation' {...props} className={iconClassName}>
			<use href={`${href}#icon--${icon}`} />
		</svg>
	);
}

export type IconName = 
  | 'asterisk'
  | 'chevron-left'
  | 'chevron-right'
  | 'gear'
  | 'paper-plane'
  | 'person'
  | 'reset'
;