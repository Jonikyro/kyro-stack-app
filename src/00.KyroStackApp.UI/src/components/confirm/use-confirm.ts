import { BaseSyntheticEvent, useRef } from 'react';
import { ConfirmRef } from '../confirm/confirm';

export function useConfirm() {
	const ref = useRef<ConfirmRef>(null);
	const open = (e?: BaseSyntheticEvent) => ref.current?.open(e);
	const close = () => ref.current?.close();

	return {
		ref,
		open,
		close
	};
}
