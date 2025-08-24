import { animationsComplete } from '@/utils/animations';
import { useRunOnceEffect } from '@/utils/use-run-once';
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

export interface DialogProps
	extends Omit<
		ComponentPropsWithoutRef<'dialog'>,
		'open' | 'onClick' | 'onClose' | 'onOpen'
	> {
	allowLightDismiss?: boolean;
	unMountWhileClosed?: boolean;
	initialOpen?: boolean;
	onOpen?: (dialog: HTMLDialogElement) => void;
	onClose?: (dialog: HTMLDialogElement) => void;
}

export type DialogRef = {
	open: () => void;
	close: () => void;
	element: HTMLDialogElement | null;
};

/**
 * This dialog uses the  {@link https://developer.mozilla.org/en-US/docs/Glossary/Top_layer top layer} when opened.
 * For that reason it is not compatible with components that use {@link https://react.dev/reference/react-dom/createPortal React Portals}
 * to render popover style elements such as tooltip, combobox, etc.
 *
 * @example
 * Basic
 * ```tsx
 * const dialog = useDialog();
 *
 * dialog.open();
 *
 * return (
 * 	<Dialog ref={dialog.ref}>
 * 		<DialogHeader>Header</DialogHeader>
 * 		<DialogBody>Body</DialogBody>
 * 		<DialogFooter>Footer</DialogFooter>
 * 	</Dialog>
 * );
 * ```
 */
export const Dialog = forwardRef(function Dialog(
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
			},
			element: dialogRef.current
		}),
		[]
	);

	useRunOnceEffect(() => {
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
		if (!dialogRef.current) return;

		dialogOpenStateObserver.observe(dialogRef.current, {
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
			data-open={isOpen}
			ref={dialogRef}
			{...rest}
			onClick={lightDismiss}
		>
			{!isOpen && unMountWhileClosed ? null : (
				<DialogContainer className={className}>{children}</DialogContainer>
			)}
		</dialog>
	);
});

interface DialogContainerProps extends ComponentPropsWithoutRef<'div'> {}

function DialogContainer(props: DialogContainerProps) {
	return <div data-component='dialog-container' {...props} />;
}
