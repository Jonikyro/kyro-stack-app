// THIS FILE IS GENERATED, edit icon-component-template.txt instead
// then run "npm run build:icons"

import clsx from 'clsx';
import { useMemo, type SVGProps } from 'react';
import href from './svg-sprite.svg';
export { href };

const sizeClassName = {
	'font-3/4': 'w-[0.75em] h-[0.75em]',
   font: 'w-[1em] h-[1em]',
   xs: 'w-3 h-3',
   sm: 'w-4 h-4',
   md: 'w-5 h-5',
   lg: 'w-6 h-6',
   xl: 'w-7 h-7'
} as const;

type Size = keyof typeof sizeClassName;

export function Icon({
   icon,
   size = 'font',
   className,
   ...props
}: SVGProps<SVGSVGElement> & {
   icon: IconName;
   size?: Size;
}) {
   const iconClassName = useMemo(
      () => clsx(sizeClassName[size], 'inline self-center', className),
      [size, className]
   );

   return (
      <svg aria-hidden='true' {...props} className={iconClassName}>
         <use href={`${href}#icon--${icon}`} />
      </svg>
   );
}
export type IconName = 
  | 'arrow'
  | 'asterisk'
  | 'bag'
  | 'caret-sort'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'cross'
  | 'dots-horizontal'
  | 'gear'
  | 'link'
;