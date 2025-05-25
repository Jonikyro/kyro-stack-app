import { animationsComplete } from '@/utils/animations';
import {
	BaseSyntheticEvent,
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	SyntheticEvent,
	useImperativeHandle,
	useRef
} from 'react';

export interface ConfirmProps extends ComponentPropsWithoutRef<'dialog'> {
	onConfirm: () => void;
	allowLightDismiss?: boolean;
	placeNearTrigger?: boolean;
}

export type ConfirmRef = {
	open: (e?: BaseSyntheticEvent) => void;
	close: () => void;
};

export const Confirm = forwardRef(function Confirm(
	{
		children,
		className,
		allowLightDismiss = true,
		placeNearTrigger = true,
		onConfirm,
		onClose,
		...rest
	}: ConfirmProps,
	ref: ForwardedRef<ConfirmRef>
) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(
		ref,
		() => ({
			open: (e) => {
				if (!dialogRef.current) return;

				dialogRef.current?.showModal();

				if (
					placeNearTrigger &&
					e &&
					'nodeName' in e.target &&
					e.target.nodeName === 'BUTTON'
				) {
					const triggerElement = e.target as HTMLElement;
					const bounds = triggerElement.getBoundingClientRect();

					const height = dialogRef.current.clientHeight;
					const width = dialogRef.current.clientWidth;

					let left = bounds.left - width / 2;
					if (left < 0) left = 10;

					dialogRef.current.style.marginTop =
						Math.max(bounds.y - (height - 15), 20) + 'px';

					if (window.innerWidth > 768)
						dialogRef.current.style.marginLeft =
							Math.min(left, window.innerWidth - width) + 'px';
				}
			},
			close: async () => {
				if (!dialogRef.current) return;
				dialogRef.current.close();
				await animationsComplete(dialogRef.current);
			}
		}),
		[placeNearTrigger]
	);

	const lightDismiss = ({ target }: React.MouseEvent<HTMLDialogElement>) => {
		if (
			Boolean(allowLightDismiss) &&
			!!target &&
			'nodeName' in target &&
			target.nodeName === 'DIALOG'
		) {
			dialogRef.current?.close();
		}
	};

	const _onClose = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
		onClose?.(e);

		if (dialogRef.current != null) {
			dialogRef.current.removeAttribute('style');
		}
	};

	return (
		<dialog
			data-component='confirm'
			ref={dialogRef}
			{...rest}
			onClick={lightDismiss}
			onClose={_onClose}
			className='rounded-md'
		>
			<form className={className} method='dialog'>
				{children}
				<footer className='d-flex gap-1'>
					<button className='btn btn-secondary'>Cancel</button>
					<button onClick={onConfirm} className='btn btn-primary'>
						Confirm
					</button>
				</footer>
			</form>
		</dialog>
	);
});
