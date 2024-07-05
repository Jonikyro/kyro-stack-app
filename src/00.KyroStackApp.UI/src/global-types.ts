declare global {
	type HtmlElementTagName = React.ElementType & keyof HTMLElementTagNameMap;

	type Prettify<T> = {
		[Key in keyof T]: T[Key];
	} & {};
}

export {};
