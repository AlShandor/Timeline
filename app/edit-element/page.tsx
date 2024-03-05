"use client"

import { useState } from "react";
import Feed from "@components/Feed";

const Edit = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
    const isSelected = () => {};
	const handleSelectElement = () => {};
    const handleRemoveElement = () => {};

	return (
		<Feed
			elements={elements}
			setElements={setElements}
			handleSelectElement={handleSelectElement}
			handleRemoveElement={handleRemoveElement}
			isSelected={isSelected}
		/>
	);
};

export default Edit;
