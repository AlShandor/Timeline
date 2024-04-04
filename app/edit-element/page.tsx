"use client"

import { useState } from "react";
import Feed from "@components/Feed";
import Footer from "@components/Footer";

const Edit = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);

    const isSelected = () => {};
    const selected = [];
	const handleSelectElement = () => {};
    const handleRemoveElement = () => {};

	return (
		<>
			<Feed
				elements={elements}
				setElements={setElements}
				handleSelectElement={handleSelectElement}
				handleRemoveElement={handleRemoveElement}
				selected={selected}
				isSelected={isSelected}
			/>
			<Footer />
		</>
	);
};

export default Edit;
