"use client"

import { useState } from "react";
import Feed from "@components/Feed";

const Edit = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);

	return (
		<Feed
			elements={elements}
			setElements={setElements}
		/>
	);
};

export default Edit;
