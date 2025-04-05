import { useState } from 'react';

/**
 * React state that that can be modified but will always prioritize the `sourceValue`.
 *
 * Note: Referential equality is used to determine if the `sourceValue` has changed. Using reference types as the `sourceValue` will
 * result in the derived value being updated when the reference changes, even if the contents of the reference do not change.
 */
export function useMutableDerivation<T>(sourceValue: T) {
	const source = useState<T>(sourceValue);
	const derived = useState<T>(sourceValue);

	if (source[0] !== sourceValue) {
		source[1](sourceValue);
		derived[1](sourceValue);
	}

	return derived;
}
