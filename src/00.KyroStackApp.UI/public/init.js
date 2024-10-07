window.onload = () => {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;

	document.documentElement.style.setProperty(
		'--root-scrollbar-width',
		scrollbarWidth + 'px'
	);
};
