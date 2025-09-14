"use client"

import { useState, Suspense } from "react";
import Feed from "@components/Feed";
import Footer from "@components/Footer";

const EditElement = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const [elementCollections, setElementCollections] = useState<Array<IElementCollection>>([]);

    const isSelected = () => {};
    const selected = [];
	const handleSelectElement = () => {};
    const handleRemoveElement = () => {};
    const handleRemoveAllElements = () => {};
    const handleSelectAllElements = () => {};

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

export default EditElement;
