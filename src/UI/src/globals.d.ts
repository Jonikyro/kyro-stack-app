type Prettify<T> = {
	[Key in keyof T]: T[Key];
} & {};

type Required<T> = Exclude<T, undefined | null>;
