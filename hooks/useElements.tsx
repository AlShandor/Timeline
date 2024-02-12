import { useState, useEffect } from "react";

export const useElements = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const [needFetching, setNeedFetching] = useState(false);

	const fetchElements = async () => {
		const response = await fetch("/api/element");
		const data = await response.json();

		setElements(data);
        setNeedFetching(false);
	};

	useEffect(() => {
		if (elements.length || needFetching) return;

		setNeedFetching(true);
	}, [elements]);

	// this only trigger when needFetching state is changed
	useEffect(() => {
		if (!needFetching) return;

		fetchElements();
	}, [needFetching]);

	return { elements, setElements };
};
