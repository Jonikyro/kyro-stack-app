import { useRef } from 'react';
import { DialogRef } from './dialog';

export function useDialog() {
	const ref = useRef<DialogRef>(null);
	const open = () => ref.current?.open();
	const close = () => ref.current?.close();

	return {
		ref,
		open,
		close
	};
}
