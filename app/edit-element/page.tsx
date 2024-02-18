"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Feed from "@components/Feed";

const Edit = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);

	// router
	const searchParams = useSearchParams();
	const queryParam = searchParams.get("query");
	const query = queryParam ? queryParam : "";

	return <Feed elements={elements} setElements={setElements} query={query} />;
};

export default Edit;
