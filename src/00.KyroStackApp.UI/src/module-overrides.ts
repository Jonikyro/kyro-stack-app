import '@ladle/react';
import 'react';

// Allows typing of generic forwardRef components.
// See: https://fettblog.eu/typescript-react-generic-forward-refs/
declare module 'react' {
	function forwardRef<T, P = NonNullable<unknown>>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
	): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

declare module '@ladle/react' {
	interface Meta {
		storyInfo?: React.ReactNode;
	}
}
