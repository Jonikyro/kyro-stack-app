// THIS FILE IS GENERATED, edit icon-component-template.txt instead
// then run "npm run build:icons"

import { type SVGProps, useMemo } from 'react'
import clsx from 'clsx'
import href from './svg-sprite.svg'
export { href }

const sizeClassName = {
	font: 'w-[1em] h-[1em]',
	xs: 'w-3 h-3',
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
	xl: 'w-7 h-7',
} as const

type Size = keyof typeof sizeClassName

export function Icon({
	icon,
	size = 'font',
	className,
	...props
}: SVGProps<SVGSVGElement> & {
	icon: IconName
	size?: Size
}) {
	const iconClassName = useMemo(
		() => (clsx(sizeClassName[size], 'inline self-center', className)),
		[size, className]);

	return (
		<svg
			{...props}
			className={iconClassName}
		>
			<use href={`${href}#${name}`} />
		</svg>
	);
}

export type IconName = 
  | 'arrow'
  | 'bag'
  | 'cross'
  | 'gear'
;