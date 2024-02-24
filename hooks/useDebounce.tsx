import { useState, useEffect } from "react";

export function useDebounceSingle(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export function useDebounceDouble(value, value2, delay) {
	const [debouncedStartYear, setDebouncedValue] = useState(value);
	const [debouncedEndYear, setDebouncedValue2] = useState(value2);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
			setDebouncedValue2(value2);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, value2, delay]);

	return { debouncedStartYear, debouncedEndYear };
}
