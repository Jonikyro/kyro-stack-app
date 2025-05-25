import { animationsComplete } from '@/utils/animations';
import { useRunOnceLayoutEffect } from '@/utils/use-run-once';
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	forwardRef,
	ReactNode,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef
} from 'react';

export type DetailsProps = {
	initialOpen: boolean;
	onOpen?: () => void;
	onClose?: () => void;
} & Omit<ComponentPropsWithoutRef<'details'>, 'open'> &
	(
		| {
				unmountWhileClosed: boolean;
				// We can't unmount the <summary> component ever.
				summary: ReactNode;
		  }
		| {
				unmountWhileClosed?: never;
				summary?: never;
		  }
	);

export type DetailsRef = {
	open: () => void;
	close: () => void;
	toggle: () => void;
};

export const Details = forwardRef(function Details(
	{ children, initialOpen, onClose, onOpen, ...rest }: DetailsProps,
	ref: ForwardedRef<DetailsRef>
) {
	const detailsRef = useRef<HTMLDetailsElement>(null);

	useRunOnceLayoutEffect(() => {
		if (!detailsRef.current || !initialOpen) return;
		detailsRef.current.open = true;
	});

	useImperativeHandle(
		ref,
		() => ({
			open: () => {
				if (!detailsRef.current) return;
				detailsRef.current.open = true;
			},
			close: () => {
				if (!detailsRef.current) return;
				detailsRef.current.open = true;
			},
			toggle: () => {
				if (!detailsRef.current) return;
				detailsRef.current.open = !detailsRef.current.open;
			}
		}),
		[]
	);

	const detailsOpenStateObserver = useMemo(
		() =>
			new MutationObserver((mutations) => {
				mutations.forEach(async (mutation) => {
					if (mutation.attributeName === 'open') {
						if (!detailsRef.current) return;

						const isOpen = detailsRef.current.hasAttribute('open');

						if (isOpen) {
							onOpen?.();
						} else {
							await animationsComplete(detailsRef.current);
							onClose?.();
						}
					}
				});
			}),
		[onOpen, onClose]
	);

	useLayoutEffect(() => {
		if (!detailsRef.current) return;

		detailsOpenStateObserver.observe(detailsRef.current, {
			attributes: true
		});

		return () => {
			detailsOpenStateObserver.disconnect();
		};
	}, [detailsOpenStateObserver]);

	return (
		<details data-component='details' ref={detailsRef} {...rest}>
			{children}
		</details>
	);
});
