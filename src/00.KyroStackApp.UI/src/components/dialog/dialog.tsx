import { animationsComplete } from '@/utils/animations';
import { cn } from '@/utils/cn';
import { useRunOnce } from '@/utils/use-run-once';
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import './dialog.css';

export type DialogProps = Omit<
	ComponentPropsWithoutRef<'dialog'>,
	'open' | 'onClick'
> & {
	allowLightDismiss?: boolean;
	unMountWhileClosed?: boolean;
	initialOpen?: boolean;
	onOpen?: (dialog: HTMLDialogElement) => void;
	onClose?: (dialog: HTMLDialogElement) => void;
};

export type DialogRef = {
	open: () => void;
	close: () => void;
};

function _Dialog(
	{
		allowLightDismiss = true,
		children,
		className,
		onClose,
		onOpen,
		unMountWhileClosed,
		initialOpen,
		...rest
	}: DialogProps,
	ref: ForwardedRef<DialogRef>
) {
	const [isOpen, setIsOpen] = useState(initialOpen ?? false);

	const dialogRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(
		ref,
		() => ({
			open: () => {
				dialogRef.current?.showModal();
			},
			close: async () => {
				dialogRef.current?.close();
			}
		}),
		[]
	);

	useRunOnce(() => {
		if (initialOpen) dialogRef.current?.showModal();
	});

	const dialogOpenStateObserver = useMemo(
		() =>
			new MutationObserver((mutations) => {
				mutations.forEach(async (mutation) => {
					if (mutation.attributeName === 'open') {
						if (!dialogRef.current) return;

						const isOpen = dialogRef.current.hasAttribute('open');

						if (isOpen) {
							onOpen?.(dialogRef.current);
							setIsOpen(true);
						} else {
							onClose?.(dialogRef.current);
							await animationsComplete(dialogRef.current);
							setIsOpen(false);
						}
					}
				});
			}),
		[onOpen, onClose]
	);

	useLayoutEffect(() => {
		dialogOpenStateObserver.observe(dialogRef.current!, {
			attributes: true
		});

		return () => {
			dialogOpenStateObserver.disconnect();
		};
	}, [dialogOpenStateObserver]);

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

	return (
		<dialog
			data-component='dialog'
			ref={dialogRef}
			className={cn(
				'overflow-hidden rounded-lg border-0 border-t border-solid border-surface-bright bg-surface-container p-0 shadow-xl',
				className
			)}
			{...rest}
			onClick={lightDismiss}
		>
			{!isOpen && unMountWhileClosed ? null : children}
		</dialog>
	);
}

export const Dialog = forwardRef(_Dialog);
