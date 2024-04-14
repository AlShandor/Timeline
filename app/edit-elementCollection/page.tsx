"use client";

import FeedCollections from "@components/FeedCollections";
import Footer from "@components/Footer";
import { useState } from "react";

const EditElementCollection = () => {
	const [elementCollections, setElementCollections] = useState<Array<IElementCollection>>([]);

	return (
		<>
			<FeedCollections elementCollections={elementCollections} setElementCollections={setElementCollections} />
			<Footer />
		</>
	);
};

export default EditElementCollection;
