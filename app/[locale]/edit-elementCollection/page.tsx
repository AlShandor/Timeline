"use client";

import Feed from "@components/Feed";
import Footer from "@components/Footer";
import { useEvents } from "@hooks/useEvents";
import { useState, Suspense } from "react";

const EditElementCollection = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const [elementCollections, setElementCollections] = useState<Array<IElementCollection>>([]);
	const { selected, setSelected, isSelected } = useEvents();

	const handleSelectElement = (newEl) => {
		setSelected((selected) => [...selected, newEl]);
	};

	const handleSelectAllElements = () => {
		setSelected(elements);
	};

	const handleRemoveElement = (el) => {
		const filteredElements = selected.filter((item) => item._id !== el._id);
		setSelected(filteredElements);
	};

	const handleRemoveAllElements = () => {
		setSelected([]);
	};

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Feed
					elements={elements}
					setElements={setElements}
					elementCollections={elementCollections}
					setElementCollections={setElementCollections}
					handleSelectElement={handleSelectElement}
					handleSelectAllElements={handleSelectAllElements}
					handleRemoveElement={handleRemoveElement}
					handleRemoveAllElements={handleRemoveAllElements}
					selected={selected}
					isSelected={isSelected}
				/>
			</Suspense>
			<Footer />
		</>
	);
};

export default EditElementCollection;
