import { ThemeState, type GlobalProvider } from '@ladle/react';
import { useEffect, useLayoutEffect } from 'react';
import './components.css';

export const Provider: GlobalProvider = (props) => {
	useEffect(() => {
		console.log(props);
	}, [props]);

	useLayoutEffect(() => {
		const ladleIframes = document.getElementsByClassName(
			'ladle-iframe'
		) as HTMLCollectionOf<HTMLIFrameElement>;

		const iframeDocumentElements = Array.from(ladleIframes)
			.map((iframe) => iframe.contentDocument?.documentElement)
			.filter(Boolean) as HTMLElement[];

		const elements = [document.documentElement, ...iframeDocumentElements];

		elements.forEach((el) => {
			el.classList.toggle(
				'theme-light',
				props.globalState.theme === ThemeState.Light
			);
			el.classList.toggle(
				'theme-dark',
				props.globalState.theme === ThemeState.Dark
			);
			el.classList.toggle(
				'theme-default',
				props.globalState.theme === ThemeState.Auto
			);
		});
	}, [props]);

	const hasStoryInfo = 'storyInfo' in (props.storyMeta ?? {});

	return (
		<div>
			{hasStoryInfo && (
				<div>
					<div>{props.storyMeta!.storyInfo}</div>
					<br />
				</div>
			)}
			{props.children}
		</div>
	);
};
