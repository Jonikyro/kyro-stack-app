export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return function (ref: T | null) {
		for (let i = 0; i < refs.length; i++) {
			const _ref = refs[i];
			if (!_ref) continue;
			if (typeof _ref === 'function') _ref(ref);
			else (_ref as React.MutableRefObject<T | null>).current = ref;
		}
	};
}
