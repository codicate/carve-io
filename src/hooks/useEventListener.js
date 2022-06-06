import { useEffect, useRef } from 'react';

const useEventListener = (element, eventType, listener, options) => {
	const savedListener = useRef(listener);
	useEffect(() => {
		savedListener.current = listener;
	}, [listener]);

	useEffect(() => {
		if (!element || !element.addEventListener) return;

		const wrappedListener = (e) => savedListener.current(e);
		element.addEventListener(eventType, wrappedListener, options);

		return () =>
			element.removeEventListener(eventType, wrappedListener, options);
	}, [element, eventType, options]);
};

export default useEventListener;
