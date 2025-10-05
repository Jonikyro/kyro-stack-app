import React from 'react';
import ReactDOM from 'react-dom/client';
import { Icon, IconName } from '../src/components/icon/icon';
import '../src/styles/index.css';
import icons from './icons.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<p className='my-2 text-center'>Click the icons to copy to clipboard</p>
		<IconPreviewPage />
	</React.StrictMode>
);

function IconPreviewPage() {
	return (
		<div className='p-[1 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]'>
			{icons.map((icon) => (
				<PreviewIcon icon={icon as IconName} />
			))}
		</div>
	);
}

type PreviewIconProps = {
	icon: IconName;
};

function onIconClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	const iconName = e.currentTarget.dataset['iconName'];
	navigator.clipboard.writeText(iconName ?? '');
}

function PreviewIcon(props: PreviewIconProps) {
	return (
		<button
			className='border-outline flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border p-2'
			onClick={onIconClick}
			data-icon-name={props.icon}
		>
			<Icon icon={props.icon} className='h-20 w-20' />
			<div className='text-center'>{props.icon}</div>
		</button>
	);
}
